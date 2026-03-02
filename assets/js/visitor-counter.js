// Visitor Counter using countapi.xyz
(function() {
  // Wait for DOM to be ready
  function initCounter() {
    // Unique namespace for this site
    const NAMESPACE = 'yjmoon99.github.io';
    const TOTAL_KEY = 'visitor_count_total';
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    const TODAY_KEY = `visitor_count_${today}`;
    
    // Check if this is the first visit in this session
    const sessionKey = 'visitor_counter_session';
    const hasVisited = sessionStorage.getItem(sessionKey);
    
    // Function to update the counter display
    function updateCounters(totalCount, todayCount) {
      const totalElement = document.getElementById('visitor-counter-total');
      const todayElement = document.getElementById('visitor-counter-today');
      
      if (totalElement) {
        const formattedTotal = (totalCount || 0).toLocaleString('en-US');
        totalElement.textContent = formattedTotal;
      }
      
      if (todayElement) {
        const formattedToday = (todayCount || 0).toLocaleString('en-US');
        todayElement.textContent = formattedToday;
      }
    }
    
    // Function to handle API response
    function handleResponse(response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
    
    // Function to increment both counters
    function incrementCounters() {
      // Increment total counter
      const totalUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${TOTAL_KEY}`;
      const todayUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${TODAY_KEY}`;
      
      Promise.all([
        fetch(totalUrl).then(handleResponse).catch(() => ({ value: 0 })),
        fetch(todayUrl).then(handleResponse).catch(() => ({ value: 0 }))
      ])
        .then(([totalData, todayData]) => {
          const totalCount = totalData.value !== undefined ? totalData.value : 0;
          const todayCount = todayData.value !== undefined ? todayData.value : 0;
          console.log('Counters incremented - Total:', totalCount, 'Today:', todayCount);
          updateCounters(totalCount, todayCount);
        })
        .catch(error => {
          console.error('Error updating visitor counter:', error);
          // Fallback: try to get current count without incrementing
          getCurrentCounts();
        });
    }
    
    // Function to get current counts without incrementing
    function getCurrentCounts() {
      const totalUrl = `https://api.countapi.xyz/get/${NAMESPACE}/${TOTAL_KEY}`;
      const todayUrl = `https://api.countapi.xyz/get/${NAMESPACE}/${TODAY_KEY}`;
      
      Promise.all([
        fetch(totalUrl).then(handleResponse).catch(() => ({ value: 0 })),
        fetch(todayUrl).then(handleResponse).catch(() => ({ value: 0 }))
      ])
        .then(([totalData, todayData]) => {
          const totalCount = totalData.value !== undefined ? totalData.value : 0;
          const todayCount = todayData.value !== undefined ? todayData.value : 0;
          console.log('Current counts - Total:', totalCount, 'Today:', todayCount);
          updateCounters(totalCount, todayCount);
        })
        .catch(error => {
          console.error('Error getting visitor count:', error);
          // Show 0 if API fails
          updateCounters(0, 0);
        });
    }
    
    // Initialize counter
    if (!hasVisited) {
      // First visit in this session - increment the counters
      console.log('First visit in this session - incrementing counters');
      sessionStorage.setItem(sessionKey, 'true');
      incrementCounters();
    } else {
      // Already visited in this session - just display current counts
      console.log('Already visited in this session - showing current counts');
      getCurrentCounts();
    }
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounter);
  } else {
    // DOM is already ready
    initCounter();
  }
})();
