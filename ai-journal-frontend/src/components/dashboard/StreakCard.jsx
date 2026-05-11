// src/components/dashboard/StreakCard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getRecordingDate } from "../../utils/testDateTime";

export default function StreakCard() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdateDate, setLastUpdateDate] = useState(null);
  const { user } = useAuth();

  const fetchStreak = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Get all journal entries for the current user, ordered by date
      const entriesRef = collection(db, "journalEntries");
      const q = query(
        entriesRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Calculate consecutive day streak
      const streak = calculateConsecutiveStreak(entries);
      setCurrentStreak(streak);
      setLastUpdateDate(new Date().toDateString());
    } catch (error) {
      console.error("Error fetching streak:", error);
      setCurrentStreak(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    if (!user) return;
    
    fetchStreak();
    
    // Set up periodic refresh (every 5 minutes)
    const interval = setInterval(() => {
      const today = getRecordingDate().toDateString(); // Use test date/time system
      if (lastUpdateDate !== today) {
        fetchStreak();
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [user, lastUpdateDate]);
  
  // Listen for test streak refresh events
  useEffect(() => {
    if (!user) return;
    
    const handleTestStreakRefresh = () => {
      console.log('Refreshing streak due to test date/time change');
      fetchStreak();
    };
    
    window.addEventListener('testStreakRefresh', handleTestStreakRefresh);
    
    return () => {
      window.removeEventListener('testStreakRefresh', handleTestStreakRefresh);
    };
  }, [user]);

  // Listen for custom refresh event
  useEffect(() => {
    const handleRefresh = () => {
      const today = new Date().toDateString();
      if (lastUpdateDate !== today) {
        fetchStreak();
      }
    };

    window.addEventListener('refreshStreak', handleRefresh);
    return () => window.removeEventListener('refreshStreak', handleRefresh);
  }, [lastUpdateDate]);

  // Calculate consecutive day streak from journal entries
  const calculateConsecutiveStreak = (entries) => {
    if (entries.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Start of today

    // Sort entries by date (newest first)
    const sortedEntries = entries.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
      const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
      return dateB - dateA;
    });

    // Check if there's an entry for today
    const todayEntry = sortedEntries.find(entry => {
      const entryDate = entry.createdAt?.toDate?.() || new Date(entry.createdAt);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === currentDate.getTime();
    });

    // If no entry for today, check yesterday
    if (!todayEntry) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Count consecutive days backwards
    while (true) {
      const entryForDate = sortedEntries.find(entry => {
        const entryDate = entry.createdAt?.toDate?.() || new Date(entry.createdAt);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === currentDate.getTime();
      });

      if (entryForDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  // Reset visual indicators after 7-day streak
  const shouldReset = currentStreak >= 7;
  
  if (loading) {
    return (
      <div className="md:col-span-3 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 min-h-[140px]">
        <div className="w-8 h-8 border-2 border-[#c8c8c0] border-t-[#5a7a5a] rounded-full animate-spin"></div>
        <span className="text-xs text-[#888880]">Loading...</span>
      </div>
    );
  }
  
  return (
    <div className="md:col-span-3 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 min-h-[140px]">
      {/* Flame icon */}
      <span className="material-symbols-outlined text-[#3a4a3a] text-3xl leading-none">
        local_fire_department
      </span>

      {/* Count */}
      <span className="font-display text-5xl font-light text-[#2a3a2a] leading-none">
        {currentStreak}
      </span>

      {/* Label */}
      <span className="text-xs text-[#888880] tracking-wide">Day Streak</span>

      {/* Dash row - visual reset after 7 days */}
      <div className="flex gap-1 mt-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`w-5 h-[3px] rounded-full ${i < (currentStreak % 7) ? "bg-[#5a7a5a]" : "bg-[#c8c8c0]"}`} />
        ))}
      </div>
      <div className="flex gap-1 mt-1">
        {[4, 5, 6].map((i) => (
          <div key={i} className={`w-5 h-[3px] rounded-full ${i < (currentStreak % 7) ? "bg-[#5a7a5a]" : "bg-[#c8c8c0]"}`} />
        ))}
      </div>
    </div>
  );
}
