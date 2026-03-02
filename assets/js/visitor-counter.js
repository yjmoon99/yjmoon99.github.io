// Visitor Counter - Simple and Reliable Version
(function() {
  'use strict';
  
  // Configuration
  const NAMESPACE = 'yjmoon99.github.io';
  const TOTAL_KEY = 'total';
  const SESSION_KEY = 'visitor_session';
  
  // Get today's date in YYYY-MM-DD format
  function getTodayKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Update counter display
  function updateDisplay(total, today) {
    const totalEl = document.getElementById('visitor-counter-total');
    const todayEl = document.getElementById('visitor-counter-today');
    const totalFeedback = document.getElementById('visitor-feedback-total');
    const todayFeedback = document.getElementById('visitor-feedback-today');
    
    if (totalEl) {
      totalEl.textContent = total.toLocaleString('en-US');
    }
    if (todayEl) {
      todayEl.textContent = today.toLocaleString('en-US');
    }
    
    // Show +1 feedback
    if (totalFeedback) {
      totalFeedback.style.display = 'inline';
      setTimeout(() => {
        totalFeedback.style.display = 'none';
      }, 2000);
    }
    if (todayFeedback) {
      todayFeedback.style.display = 'inline';
      setTimeout(() => {
        todayFeedback.style.display = 'none';
      }, 2000);
    }
  }
  
  // Increment counters
  function incrementCounters() {
    const todayKey = getTodayKey();
    const totalUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${TOTAL_KEY}`;
    const todayUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${todayKey}`;
    
    // Increment total
    fetch(totalUrl)
      .then(response => {
        if (!response.ok) throw new Error('Total API failed');
        return response.json();
      })
      .then(data => {
        const totalCount = data.value || 0;
        
        // Increment today
        return fetch(todayUrl)
          .then(response => {
            if (!response.ok) throw new Error('Today API failed');
            return response.json();
          })
          .then(todayData => {
            const todayCount = todayData.value || 0;
            updateDisplay(totalCount, todayCount);
          })
          .catch(() => {
            updateDisplay(totalCount, 0);
          });
      })
      .catch(() => {
        // If total fails, try to get today
        fetch(todayUrl)
          .then(response => response.json())
          .then(data => {
            updateDisplay(0, data.value || 0);
          })
          .catch(() => {
            updateDisplay(0, 0);
          });
      });
  }
  
  // Get current counts without incrementing
  function getCounts() {
    const todayKey = getTodayKey();
    const totalUrl = `https://api.countapi.xyz/get/${NAMESPACE}/${TOTAL_KEY}`;
    const todayUrl = `https://api.countapi.xyz/get/${NAMESPACE}/${todayKey}`;
    
    Promise.all([
      fetch(totalUrl).then(r => r.ok ? r.json() : { value: 0 }).catch(() => ({ value: 0 })),
      fetch(todayUrl).then(r => r.ok ? r.json() : { value: 0 }).catch(() => ({ value: 0 }))
    ])
    .then(([totalData, todayData]) => {
      const total = totalData.value || 0;
      const today = todayData.value || 0;
      updateDisplay(total, today);
    })
    .catch(() => {
      updateDisplay(0, 0);
    });
  }
  
  // Initialize
  function init() {
    // Check if already visited in this session
    const hasVisited = sessionStorage.getItem(SESSION_KEY);
    
    if (!hasVisited) {
      // First visit - increment
      sessionStorage.setItem(SESSION_KEY, 'true');
      incrementCounters();
    } else {
      // Already visited - just show counts
      getCounts();
    }
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
