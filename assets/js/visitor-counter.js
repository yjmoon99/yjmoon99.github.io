// Visitor Counter using countapi.xyz
(function() {
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
      const formattedTotal = totalCount.toLocaleString('en-US');
      totalElement.textContent = formattedTotal;
    }
    
    if (todayElement) {
      const formattedToday = todayCount.toLocaleString('en-US');
      todayElement.textContent = formattedToday;
    }
  }
  
  // Function to increment both counters
  function incrementCounters() {
    // Increment total counter
    const totalUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${TOTAL_KEY}`;
    const todayUrl = `https://api.countapi.xyz/hit/${NAMESPACE}/${TODAY_KEY}`;
    
    Promise.all([
      fetch(totalUrl).then(response => response.json()),
      fetch(todayUrl).then(response => response.json())
    ])
      .then(([totalData, todayData]) => {
        const totalCount = totalData.value !== undefined ? totalData.value : 0;
        const todayCount = todayData.value !== undefined ? todayData.value : 0;
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
      fetch(totalUrl).then(response => response.json()),
      fetch(todayUrl).then(response => response.json())
    ])
      .then(([totalData, todayData]) => {
        const totalCount = totalData.value !== undefined ? totalData.value : 0;
        const todayCount = todayData.value !== undefined ? todayData.value : 0;
        updateCounters(totalCount, todayCount);
      })
      .catch(error => {
        console.error('Error getting visitor count:', error);
      });
  }
  
  // Initialize counter
  if (!hasVisited) {
    // First visit in this session - increment the counters
    sessionStorage.setItem(sessionKey, 'true');
    incrementCounters();
  } else {
    // Already visited in this session - just display current counts
    getCurrentCounts();
  }
})();
