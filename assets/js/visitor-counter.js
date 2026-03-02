// Visitor Counter - localStorage based (reliable)
(function() {
  'use strict';
  
  const SESSION_KEY = 'visitor_session';
  const TOTAL_KEY = 'visitor_total';
  const TODAY_KEY_PREFIX = 'visitor_today_';
  
  // Get today's date key
  function getTodayKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${TODAY_KEY_PREFIX}${year}-${month}-${day}`;
  }
  
  // Get stored count
  function getStoredCount(key) {
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : 0;
  }
  
  // Set stored count
  function setStoredCount(key, value) {
    localStorage.setItem(key, value.toString());
  }
  
  // Update display
  function updateDisplay(total, today, showFeedback = false) {
    const totalEl = document.getElementById('visitor-counter-total');
    const todayEl = document.getElementById('visitor-counter-today');
    const totalFeedback = document.getElementById('visitor-feedback-total');
    const todayFeedback = document.getElementById('visitor-feedback-today');
    
    if (totalEl) {
      totalEl.textContent = total.toLocaleString('en-US');
      if (showFeedback && totalFeedback) {
        totalEl.classList.add('counter-highlight');
        totalFeedback.style.display = 'inline';
        setTimeout(() => {
          totalFeedback.style.display = 'none';
          totalEl.classList.remove('counter-highlight');
        }, 2000);
      }
    }
    
    if (todayEl) {
      todayEl.textContent = today.toLocaleString('en-US');
      if (showFeedback && todayFeedback) {
        todayEl.classList.add('counter-highlight');
        todayFeedback.style.display = 'inline';
        setTimeout(() => {
          todayFeedback.style.display = 'none';
          todayEl.classList.remove('counter-highlight');
        }, 2000);
      }
    }
  }
  
  // Initialize counter
  function init() {
    const todayKey = getTodayKey();
    
    // Get current counts
    let total = getStoredCount(TOTAL_KEY);
    let today = getStoredCount(todayKey);
    
    // Check if this is a new page load (not just a navigation within the same session)
    // Use a combination of sessionStorage and a timestamp to detect new visits
    const lastVisitTime = sessionStorage.getItem('last_visit_time');
    const currentTime = Date.now();
    const VISIT_INTERVAL = 1000; // Minimum 1 second between visits to count as new
    
    // Always increment if:
    // 1. No last visit time recorded (first visit)
    // 2. More than 1 second has passed since last visit (new page load)
    // 3. Different day (for today counter)
    const isNewVisit = !lastVisitTime || (currentTime - parseInt(lastVisitTime, 10)) > VISIT_INTERVAL;
    
    if (isNewVisit) {
      // New visit - increment
      total += 1;
      today += 1;
      
      // Save counts
      setStoredCount(TOTAL_KEY, total);
      setStoredCount(todayKey, today);
      
      // Record visit time
      sessionStorage.setItem('last_visit_time', currentTime.toString());
      
      // Update display with feedback
      updateDisplay(total, today, true);
    } else {
      // Same visit (within 1 second) - just show counts
      updateDisplay(total, today, false);
    }
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
