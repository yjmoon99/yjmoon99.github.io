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
    
    // Store previous counts to detect increments
    let previousTotal = null;
    let previousToday = null;
    
    // Function to update the counter display
    function updateCounters(totalCount, todayCount, isIncrement = false) {
      const totalElement = document.getElementById('visitor-counter-total');
      const todayElement = document.getElementById('visitor-counter-today');
      const totalFeedback = document.getElementById('visitor-feedback-total');
      const todayFeedback = document.getElementById('visitor-feedback-today');
      
      if (totalElement) {
        const formattedTotal = (totalCount || 0).toLocaleString('en-US');
        const oldValue = parseInt(totalElement.textContent.replace(/,/g, '')) || 0;
        totalElement.textContent = formattedTotal;
        
        // Show +1 feedback if incremented (always show on increment, or if count increased)
        if (isIncrement && (previousTotal === null || totalCount > previousTotal)) {
          totalElement.classList.add('counter-highlight');
          if (totalFeedback) {
            totalFeedback.style.display = 'inline';
            setTimeout(() => {
              totalFeedback.style.display = 'none';
              totalElement.classList.remove('counter-highlight');
            }, 2000);
          }
        }
      }
      
      if (todayElement) {
        const formattedToday = (todayCount || 0).toLocaleString('en-US');
        const oldValue = parseInt(todayElement.textContent.replace(/,/g, '')) || 0;
        todayElement.textContent = formattedToday;
        
        // Show +1 feedback if incremented (always show on increment, or if count increased)
        if (isIncrement && (previousToday === null || todayCount > previousToday)) {
          todayElement.classList.add('counter-highlight');
          if (todayFeedback) {
            todayFeedback.style.display = 'inline';
            setTimeout(() => {
              todayFeedback.style.display = 'none';
              todayElement.classList.remove('counter-highlight');
            }, 2000);
          }
        }
      }
      
      // Update previous counts
      previousTotal = totalCount;
      previousToday = todayCount;
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
      
      console.log('Incrementing counters - URLs:', totalUrl, todayUrl);
      
      Promise.all([
        fetch(totalUrl)
          .then(response => {
            console.log('Total response status:', response.status);
            return handleResponse(response);
          })
          .then(data => {
            console.log('Total response data:', data);
            return data;
          })
          .catch(error => {
            console.error('Total fetch error:', error);
            return { value: 0 };
          }),
        fetch(todayUrl)
          .then(response => {
            console.log('Today response status:', response.status);
            return handleResponse(response);
          })
          .then(data => {
            console.log('Today response data:', data);
            return data;
          })
          .catch(error => {
            console.error('Today fetch error:', error);
            return { value: 0 };
          })
      ])
        .then(([totalData, todayData]) => {
          console.log('Raw response - Total:', totalData, 'Today:', todayData);
          const totalCount = totalData && (totalData.value !== undefined ? totalData.value : (totalData.count !== undefined ? totalData.count : 0));
          const todayCount = todayData && (todayData.value !== undefined ? todayData.value : (todayData.count !== undefined ? todayData.count : 0));
          console.log('Parsed counts - Total:', totalCount, 'Today:', todayCount);
          updateCounters(totalCount, todayCount, true);
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
        fetch(totalUrl)
          .then(handleResponse)
          .catch(error => {
            console.error('Total get error:', error);
            return { value: 0 };
          }),
        fetch(todayUrl)
          .then(handleResponse)
          .catch(error => {
            console.error('Today get error:', error);
            return { value: 0 };
          })
      ])
        .then(([totalData, todayData]) => {
          const totalCount = totalData && (totalData.value !== undefined ? totalData.value : (totalData.count !== undefined ? totalData.count : 0));
          const todayCount = todayData && (todayData.value !== undefined ? todayData.value : (todayData.count !== undefined ? todayData.count : 0));
          console.log('Current counts - Total:', totalCount, 'Today:', todayCount);
          updateCounters(totalCount, todayCount, false);
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
