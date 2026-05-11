// src/utils/testDateTime.js
let testDateTime = null;

// Minimal override: only affects specific functions, no global Date override
export function enableTestDateTime(dateString) {
  testDateTime = new Date(dateString);
  
  // Store test date/time for specific functions to use
  window.testDateTime = testDateTime;
  
  // NO global Date override to prevent Firebase issues
}

export function disableTestDateTime() {
  testDateTime = null;
  window.testDateTime = null;
  console.log('Test mode disabled');
}

export function isTestModeEnabled() {
  return testDateTime !== null;
}

export function getTestDateTime() {
  return testDateTime;
}

// Custom Date function for recording only
export function getRecordingDate() {
  if (isTestModeEnabled()) {
    return getTestDateTime();
  } else {
    return new Date();
  }
}

// Initialize test mode if localStorage indicates we're in testing mode
export function initializeTestMode() {
  const testMode = localStorage.getItem('testMode');
  const testDateTimeStr = localStorage.getItem('testDateTime');
  
  if (testMode === 'true' && testDateTimeStr) {
    enableTestDateTime(testDateTimeStr);
    console.log('Test mode enabled with date:', new Date(testDateTimeStr));
  }
}

// Listen for test mode changes
if (typeof window !== 'undefined') {
  window.addEventListener('testDateTimeChanged', (event) => {
    const { dateTime } = event.detail;
    enableTestDateTime(dateTime);
  });
  
  window.addEventListener('testModeExited', () => {
    disableTestDateTime();
  });
  
  // Listen for refreshStreak events and update all streak components
  window.addEventListener('refreshStreak', () => {
    // Force refresh of all streak components when test date/time changes
    console.log('Refreshing streak components due to test date/time change');
    
    // Dispatch custom event to notify all components
    window.dispatchEvent(new CustomEvent('testStreakRefresh', {
      detail: { timestamp: Date.now() }
    }));
  });
}
