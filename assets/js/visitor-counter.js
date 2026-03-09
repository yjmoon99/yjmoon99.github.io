// Visitor Counter - Hybrid approach: CountAPI + localStorage fallback
(function() {
  'use strict';
  
  // Use a unique namespace for this site
  const SITE_NAMESPACE = 'yjmoon99-github-io';
  const TOTAL_KEY = 'total';
  const TODAY_KEY_PREFIX = 'today-';
  const LOCAL_STORAGE_PREFIX = 'visitor_local_';
  
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
  
  // Get from localStorage as fallback
  function getLocalStorageCount(key) {
    const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    return stored ? parseInt(stored, 10) : 0;
  }
  
  // Set to localStorage as backup
  function setLocalStorageCount(key, value) {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, value.toString());
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
  
  // Fetch count from API with localStorage fallback
  function fetchCount(key, callback) {
    const url = getCountAPIUrl(key, 'get');
    const fallbackCount = getLocalStorageCount(key);
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.value !== undefined) {
          // Update localStorage with API value
          setLocalStorageCount(key, data.value);
          callback(data.value);
        } else {
          console.warn('Invalid response from API, using localStorage:', fallbackCount);
          callback(fallbackCount);
        }
      })
      .catch(error => {
        console.warn('Error fetching count from API, using localStorage:', error);
        callback(fallbackCount);
      });
  }
  
  // Increment count via API with localStorage fallback
  function incrementCount(key, callback) {
    const url = getCountAPIUrl(key, 'hit');
    const currentLocal = getLocalStorageCount(key);
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.value !== undefined) {
          // Update localStorage with API value
          setLocalStorageCount(key, data.value);
          callback(data.value);
        } else {
          // Fallback: increment localStorage
          const newValue = currentLocal + 1;
          setLocalStorageCount(key, newValue);
          console.warn('Invalid API response, using localStorage:', newValue);
          callback(newValue);
        }
      })
      .catch(error => {
        // Fallback: increment localStorage
        const newValue = currentLocal + 1;
        setLocalStorageCount(key, newValue);
        console.warn('Error incrementing via API, using localStorage:', error);
        callback(newValue);
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
      // New visit - increment both counters in parallel
      let totalCount = 0;
      let todayCount = 0;
      let totalLoaded = false;
      let todayLoaded = false;
      
      function checkAndUpdate() {
        if (totalLoaded && todayLoaded) {
          sessionStorage.setItem(sessionKey, 'true');
          updateDisplay(totalCount, todayCount, true);
        }
      }
      
      incrementCount(totalKey, function(total) {
        totalCount = total;
        totalLoaded = true;
        checkAndUpdate();
      });
      
      incrementCount(todayCountKey, function(today) {
        todayCount = today;
        todayLoaded = true;
        checkAndUpdate();
      });
    } else {
      // Already visited today - just fetch and display
      let totalCount = 0;
      let todayCount = 0;
      let totalLoaded = false;
      let todayLoaded = false;
      
      function checkAndUpdate() {
        if (totalLoaded && todayLoaded) {
          updateDisplay(totalCount, todayCount, false);
        }
      }
      
      fetchCount(totalKey, function(total) {
        totalCount = total;
        totalLoaded = true;
        checkAndUpdate();
      });
      
      fetchCount(todayCountKey, function(today) {
        todayCount = today;
        todayLoaded = true;
        checkAndUpdate();
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
