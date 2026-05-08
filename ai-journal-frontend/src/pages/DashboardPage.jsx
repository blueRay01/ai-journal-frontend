import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import StreakCard from "../components/dashboard/StreakCard";
import EnergyFlowCard from "../components/dashboard/EnergyFlowCard";
import ActiveFocusCard from "../components/dashboard/ActiveFocusCard";
import ResonanceTrackerCard from "../components/dashboard/ResonanceTrackerCard";
import TimelineProgressionCard from "../components/dashboard/TimelineProgressionCard";
import BottomNav from "../components/layout/BottomNav";
import DashboardHeader from "../components/layout/DashboardHeader";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeline, setTimeline] = useState([]);
  const [entryDate, setEntryDate] = useState(null);
  const [resonancePct, setResonancePct] = useState(0);
  const [activeFocus, setActiveFocus] = useState(null);
  const [userNickname, setUserNickname] = useState("");
  const [greeting, setGreeting] = useState("Good Morning");
  const [showTomorrowPlanToday, setShowTomorrowPlanToday] = useState(false);
  const [isFirstDay, setIsFirstDay] = useState(true);
  const [streakBroken, setStreakBroken] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserNickname(userData.nickname || "");
        }
      } catch (err) {
        console.error("Failed to load user data:", err);
      }
    };
    
    const fetchLatestTimeline = async () => {
      try {
        const q = query(
          collection(db, "journalEntries"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const snap = await getDocs(q);
        if (snap.empty) return;
        const data = snap.docs[0].data();
        if (data.tomorrowTimeline) setTimeline(data.tomorrowTimeline);
        if (data.createdAt?.toDate) setEntryDate(data.createdAt.toDate());
      } catch (err) {
        console.error("Failed to load timeline:", err);
      }
    };
    
    fetchUserData();
    fetchLatestTimeline();
    checkTomorrowPlanDisplay();
  }, [user]);
  
  const checkTomorrowPlanDisplay = async () => {
    if (!user) return;
    
    try {
      const entriesRef = collection(db, "journalEntries");
      const allEntriesQuery = query(entriesRef, where("userId", "==", user.uid), orderBy("createdAt", "asc"));
      const allEntriesSnapshot = await getDocs(allEntriesQuery);
      const allEntries = allEntriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      
      // Check if it's the first day or if streak is broken
      if (allEntries.length <= 1) {
        setShowTomorrowPlanToday(true); // First day, show tomorrow's plan today
        setIsFirstDay(true);
        setStreakBroken(false);
      } else {
        setIsFirstDay(false);
        // Check for broken streak
        let broken = false;
        for (let i = 1; i < allEntries.length; i++) {
          const currentDate = new Date(allEntries[i].createdAt);
          const previousDate = new Date(allEntries[i-1].createdAt);
          
          currentDate.setHours(0, 0, 0, 0);
          previousDate.setHours(0, 0, 0, 0);
          
          const diffTime = currentDate - previousDate;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays > 1) {
            broken = true;
            break;
          }
        }
        
        setStreakBroken(broken);
        setShowTomorrowPlanToday(broken);
      }
    } catch (error) {
      console.error("Error checking tomorrow plan display:", error);
    }
  };
  
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good Morning");
      } else if (hour < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };
    
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden pb-[120px]"
      style={{ background: "linear-gradient(160deg, rgb(238, 244, 232) 0%, rgb(255, 255, 255) 50%, rgb(245, 245, 239) 100%)" }}
    >
      <div className="absolute top-0 left-[calc(50%-600px)] w-[1200px] h-[500px] z-0 bg-[#d7e8c7] rounded-full blur-[80px] opacity-50 pointer-events-none" />
      <div className="absolute w-[50%] h-[50%] top-[60%] left-[-20%] z-0 bg-[#e7deff] rounded-full blur-[60px] opacity-15 pointer-events-none" />
      <div className="absolute w-[60%] h-[60%] top-[-20%] left-[50%] z-0 bg-[#c9ebcd] rounded-full blur-[60px] opacity-25 pointer-events-none" />

      <DashboardHeader />

      <main className="relative z-10 max-w-[960px] mx-auto px-4 md:px-8 pt-[88px] pb-8 flex flex-col gap-6">
        <div className="mb-2">
          <h1 className="font-display text-[42px] md:text-[52px] font-light leading-tight tracking-tight text-[#2a3a2a]">
            {greeting}{userNickname ? `, ${userNickname}` : ""}.
          </h1>
          <p className="text-[16px] text-[#6a7a6a] mt-2 leading-relaxed">
            Take a moment to center yourself today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-7 flex flex-col gap-4">
            <EnergyFlowCard />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4"><StreakCard /></div>
              <div className="col-span-8"><ActiveFocusCard title={activeFocus?.title ?? null}
  subtitle={activeFocus?.subtitle ?? null}/></div>
            </div>
            <ResonanceTrackerCard goalPct={resonancePct}/>
            <button
              onClick={() => navigate("/checkin")}
              className="w-full bg-[#2f4a35] text-white text-sm font-medium py-4 rounded-xl hover:bg-[#253d2a] transition-all shadow-[0_4px_20px_rgba(47,74,53,0.25)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Check in today
            </button>
          </div>

          <div className="md:col-span-5">
            <TimelineProgressionCard timeline={timeline} entryDate={entryDate} onProgressChange={setResonancePct} onActiveFocusChange={setActiveFocus} showTomorrowPlanToday={showTomorrowPlanToday} isFirstDay={isFirstDay} streakBroken={streakBroken}/>
          </div>
        </div>
      </main>

      <BottomNav activePage="home" onNavigate={navigate} />
    </div>
  );
}