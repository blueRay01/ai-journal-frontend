// src/pages/TestingDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/layout/DashboardHeader";
import BottomNav from "../components/layout/BottomNav";
import { useAuth } from "../contexts/AuthContext";
import { enableTestDateTime, disableTestDateTime } from "../utils/testDateTime";

export default function TestingDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Testing controls for date and time
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date().toTimeString().slice(0, 5));
  const [isTimeLocked, setIsTimeLocked] = useState(false);

  // Simulate timeline completion for testing
  const [isTimelineComplete, setIsTimelineComplete] = useState(false);

  useEffect(() => {
    // Override localStorage with test values
    localStorage.setItem('timelineComplete', isTimelineComplete.toString());
    localStorage.setItem('testMode', 'true');
    
    // Store test date/time for all components to use
    const testDateTime = new Date(currentDate);
    testDateTime.setHours(parseInt(currentTime.split(':')[0]));
    testDateTime.setMinutes(parseInt(currentTime.split(':')[1]));
    
    localStorage.setItem('testDateTime', testDateTime.toISOString());
    localStorage.setItem('testCurrentDate', currentDate.toISOString().split('T')[0]);
    localStorage.setItem('testCurrentTime', currentTime);
    
    // Enable global date/time override
    enableTestDateTime(testDateTime);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('testDateTimeChanged', {
      detail: {
        date: currentDate,
        time: currentTime,
        dateTime: testDateTime,
        timelineComplete: isTimelineComplete
      }
    }));
  }, [currentDate, currentTime, isTimelineComplete]);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setCurrentDate(newDate);
    setCurrentTime(newDate.toTimeString().slice(0, 5));
    
    // Update localStorage to simulate timeline progression
    const hours = newDate.getHours();
    setIsTimelineComplete(hours >= 18); // Assume timeline completes at 6 PM
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    
    // Update timeline completion based on time
    const [hours, minutes] = newTime.split(':').map(Number);
    setIsTimelineComplete(hours >= 18);
  };

  const simulateTimelineComplete = () => {
    setIsTimelineComplete(true);
    localStorage.setItem('timelineComplete', 'true');
    
    // Update global test date/time to reflect timeline completion
    const testDateTime = new Date(currentDate);
    testDateTime.setHours(18, 0, 0, 0); // Set to 6 PM to show completion
    enableTestDateTime(testDateTime);
  };

  const simulateTimelineIncomplete = () => {
    setIsTimelineComplete(false);
    localStorage.setItem('timelineComplete', 'false');
    
    // Update global test date/time to reflect timeline incompletion
    const testDateTime = new Date(currentDate);
    testDateTime.setHours(17, 0, 0, 0); // Set to 5 PM to show incompletion
    enableTestDateTime(testDateTime);
  };

  const exitTesting = () => {
    // Clean up all test values and restore normal operation
    localStorage.removeItem('testMode');
    localStorage.removeItem('testDateTime');
    localStorage.removeItem('testCurrentDate');
    localStorage.removeItem('testCurrentTime');
    
    // Disable global date/time override
    disableTestDateTime();
    
    // Dispatch event to notify components of test mode exit
    window.dispatchEvent(new CustomEvent('testModeExited', {}));
    
    navigate('/dashboard');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-f5f5f0 to-e8e8e0 pb-40">
      <DashboardHeader />
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-[100px]">
        {/* Testing Header */}
        <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <h1 className="text-2xl font-bold text-yellow-800 mb-4">
            🧪 Testing Dashboard
          </h1>
          <p className="text-yellow-700 mb-4">
            Use this dashboard to test check-in, streaks, and insights functionality by controlling date and time.
          </p>
        </div>

        {/* Date and Time Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4">📅 Date Control</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                  Set Current Date:
                </label>
                <input
                  type="date"
                  value={currentDate.toISOString().split('T')[0]}
                  onChange={handleDateChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
              
              <div className="text-sm text-on-surface">
                <p><strong>Current Date:</strong> {currentDate.toLocaleDateString()}</p>
                <p><strong>Current Time:</strong> {currentTime}</p>
                <p><strong>Timeline Status:</strong> 
                  <span className={isTimelineComplete ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {isTimelineComplete ? "✅ Complete" : "❌ Incomplete"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4">⚡ Quick Actions</h2>
            
            <div className="space-y-4">
              <button
                onClick={simulateTimelineComplete}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ✅ Simulate Timeline Complete
              </button>
              
              <button
                onClick={simulateTimelineIncomplete}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                ❌ Simulate Timeline Incomplete
              </button>
              
              <button
                onClick={() => navigate('/checkin')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📝 Test Check-in Page
              </button>
              
              <button
                onClick={() => navigate('/report')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                📊 Test Report Page
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">📋 Testing Instructions</h2>
          
          <div className="space-y-2 text-sm text-blue-700">
            <p>• <strong>Date Control:</strong> Set any date to test different scenarios</p>
            <p>• <strong>Time Control:</strong> Adjust time to test timeline completion logic</p>
            <p>• <strong>Timeline Status:</strong> Timeline completion affects check-in availability</p>
            <p>• <strong>Quick Actions:</strong> Simulate different states for testing</p>
            <p>• <strong>Navigation:</strong> Test check-in and report pages with controlled conditions</p>
            <p>• <strong>Exit Testing:</strong> Return to normal dashboard mode</p>
          </div>
        </div>
      </main>

      <BottomNav activePage="testing" onNavigate={navigate} />
    </div>
  );
}
