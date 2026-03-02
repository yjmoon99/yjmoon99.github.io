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
  
  // Store previous values to detect increments
  let prevTotal = null;
  let prevToday = null;
  
  // Update counter display
  function updateDisplay(total, today, showFeedback = false) {
    const totalEl = document.getElementById('visitor-counter-total');
    const todayEl = document.getElementById('visitor-counter-today');
    const totalFeedback = document.getElementById('visitor-feedback-total');
    const todayFeedback = document.getElementById('visitor-feedback-today');
    
    // Update total
    if (totalEl) {
      const oldTotal = parseInt(totalEl.textContent.replace(/,/g, '')) || 0;
      totalEl.textContent = total.toLocaleString('en-US');
      
      // Show +1 only if actually incremented
      if (showFeedback && totalFeedback && (prevTotal === null || total > (prevTotal || 0))) {
        totalFeedback.style.display = 'inline';
        totalEl.classList.add('counter-highlight');
        setTimeout(() => {
          totalFeedback.style.display = 'none';
          totalEl.classList.remove('counter-highlight');
        }, 2000);
      }
    }
    
    // Update today
    if (todayEl) {
      const oldToday = parseInt(todayEl.textContent.replace(/,/g, '')) || 0;
      todayEl.textContent = today.toLocaleString('en-US');
      
      // Show +1 only if actually incremented
      if (showFeedback && todayFeedback && (prevToday === null || today > (prevToday || 0))) {
        todayFeedback.style.display = 'inline';
        todayEl.classList.add('counter-highlight');
        setTimeout(() => {
          todayFeedback.style.display = 'none';
          todayEl.classList.remove('counter-highlight');
        }, 2000);
      }
    }
    
    // Update previous values
    prevTotal = total;
    prevToday = today;
  }
  
  // Increment counters
  function incrementCounters() {
    const todayKey = getTodayKey();
    const totalUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${TOTAL_KEY}`;
    const todayUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${todayKey}`;
    
    console.log('Incrementing counters...', { totalUrl, todayUrl });
    
    // Increment both in parallel
    Promise.all([
      fetch(totalUrl)
        .then(response => {
          console.log('Total response status:', response.status);
          if (!response.ok) {
            throw new Error(`Total API failed: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Total response data:', data);
          return data.value !== undefined ? data.value : (data.count !== undefined ? data.count : 0);
        })
        .catch(error => {
          console.error('Total fetch error:', error);
          return 0;
        }),
      fetch(todayUrl)
        .then(response => {
          console.log('Today response status:', response.status);
          if (!response.ok) {
            throw new Error(`Today API failed: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Today response data:', data);
          return data.value !== undefined ? data.value : (data.count !== undefined ? data.count : 0);
        })
        .catch(error => {
          console.error('Today fetch error:', error);
          return 0;
        })
    ])
    .then(([totalCount, todayCount]) => {
      console.log('Final counts - Total:', totalCount, 'Today:', todayCount);
      updateDisplay(totalCount, todayCount, true);
    })
    .catch(error => {
      console.error('Error in incrementCounters:', error);
      updateDisplay(0, 0, false);
    });
  }
  
  // Get current counts without incrementing
  function getCounts() {
    const todayKey = getTodayKey();
    const totalUrl = `https://api.countapi.xyz/get/${NAMESPACE}/${TOTAL_KEY}`;
    const todayUrl = `https://api.countapi.xyz/get/${NAMESPACE}/${todayKey}`;
    
    Promise.all([
      fetch(totalUrl)
        .then(r => r.ok ? r.json() : { value: 0 })
        .then(data => data.value !== undefined ? data.value : (data.count !== undefined ? data.count : 0))
        .catch(() => 0),
      fetch(todayUrl)
        .then(r => r.ok ? r.json() : { value: 0 })
        .then(data => data.value !== undefined ? data.value : (data.count !== undefined ? data.count : 0))
        .catch(() => 0)
    ])
    .then(([total, today]) => {
      updateDisplay(total, today, false);
    })
    .catch(() => {
      updateDisplay(0, 0, false);
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
