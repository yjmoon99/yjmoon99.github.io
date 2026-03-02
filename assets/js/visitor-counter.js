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
    const hasVisited = sessionStorage.getItem(SESSION_KEY);
    const todayKey = getTodayKey();
    
    // Get current counts
    let total = getStoredCount(TOTAL_KEY);
    let today = getStoredCount(todayKey);
    
    if (!hasVisited) {
      // First visit in this session - increment
      total += 1;
      today += 1;
      
      // Save counts
      setStoredCount(TOTAL_KEY, total);
      setStoredCount(todayKey, today);
      
      // Mark as visited
      sessionStorage.setItem(SESSION_KEY, 'true');
      
      // Update display with feedback
      updateDisplay(total, today, true);
    } else {
      // Already visited - just show counts
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
