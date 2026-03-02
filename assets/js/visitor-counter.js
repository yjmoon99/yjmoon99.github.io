// Visitor Counter using countapi.xyz
(function() {
  // Unique namespace for this site
  const NAMESPACE = 'yjmoon99.github.io';
  const KEY = 'visitor_count';
  
  // Check if this is the first visit in this session
  const sessionKey = 'visitor_counter_session';
  const hasVisited = sessionStorage.getItem(sessionKey);
  
  // Function to update the counter display
  function updateCounter(count) {
    const counterElement = document.getElementById('visitor-counter');
    if (counterElement) {
      // Format number with commas
      const formattedCount = count.toLocaleString('en-US');
      counterElement.textContent = formattedCount;
    }
  }
  
  // Function to increment the counter
  function incrementCounter() {
    const url = `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.value !== undefined) {
          updateCounter(data.value);
        }
      })
      .catch(error => {
        console.error('Error updating visitor counter:', error);
        // Fallback: try to get current count without incrementing
        getCurrentCount();
      });
  }
  
  // Function to get current count without incrementing
  function getCurrentCount() {
    const url = `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.value !== undefined) {
          updateCounter(data.value);
        }
      })
      .catch(error => {
        console.error('Error getting visitor count:', error);
      });
  }
  
  // Initialize counter
  if (!hasVisited) {
    // First visit in this session - increment the counter
    sessionStorage.setItem(sessionKey, 'true');
    incrementCounter();
  } else {
    // Already visited in this session - just display current count
    getCurrentCount();
  }
})();
