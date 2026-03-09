// Visitor Counter - Global counter using CountAPI (works across all devices)
(function() {
  'use strict';
  
  // Use a unique namespace for this site
  const SITE_NAMESPACE = 'yjmoon99-github-io';
  const TOTAL_KEY = 'total';
  const TODAY_KEY_PREFIX = 'today-';
  
  // Get today's date key
  function getTodayKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${TODAY_KEY_PREFIX}${year}-${month}-${day}`;
  }
  
  // CountAPI base URL
  function getCountAPIUrl(key, operation = 'get') {
    const namespace = `${SITE_NAMESPACE}-${key}`;
    if (operation === 'hit') {
      return `https://api.countapi.xyz/hit/${namespace}`;
    }
    return `https://api.countapi.xyz/get/${namespace}`;
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
  
  // Fetch count from API
  function fetchCount(key, callback) {
    const url = getCountAPIUrl(key, 'get');
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.value !== undefined) {
          callback(data.value);
        } else {
          callback(0);
        }
      })
      .catch(error => {
        console.error('Error fetching count:', error);
        callback(0);
      });
  }
  
  // Increment count via API
  function incrementCount(key, callback) {
    const url = getCountAPIUrl(key, 'hit');
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.value !== undefined) {
          callback(data.value);
        } else {
          callback(0);
        }
      })
      .catch(error => {
        console.error('Error incrementing count:', error);
        callback(0);
      });
  }
  
  // Initialize counter
  function init() {
    const todayKey = getTodayKey();
    const totalKey = TOTAL_KEY;
    const todayCountKey = todayKey;
    
    // Check if this is a new visit (using sessionStorage to avoid double counting on same session)
    const sessionKey = 'visitor_session_' + todayKey;
    const hasVisitedToday = sessionStorage.getItem(sessionKey);
    
    if (!hasVisitedToday) {
      // New visit - increment both counters
      incrementCount(totalKey, function(total) {
        incrementCount(todayCountKey, function(today) {
          sessionStorage.setItem(sessionKey, 'true');
          updateDisplay(total, today, true);
        });
      });
    } else {
      // Already visited today - just fetch and display
      fetchCount(totalKey, function(total) {
        fetchCount(todayCountKey, function(today) {
          updateDisplay(total, today, false);
        });
      });
    }
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
