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
    
    // Get current page URL
    const currentPage = window.location.pathname;
    
    // Check if current page is a portfolio page
    const isPortfolioPage = currentPage.startsWith('/portfolio/') || currentPage === '/portfolio';
    
    // Check if already visited portfolio in this session
    const hasVisitedPortfolio = sessionStorage.getItem('visited_portfolio') === 'true';
    
    // Only increment if:
    // 1. Current page is a portfolio page
    // 2. Haven't visited portfolio in this session yet
    if (isPortfolioPage && !hasVisitedPortfolio) {
      // First visit to portfolio - increment
      total += 1;
      today += 1;
      
      // Save counts
      setStoredCount(TOTAL_KEY, total);
      setStoredCount(todayKey, today);
      
      // Mark portfolio as visited in this session
      sessionStorage.setItem('visited_portfolio', 'true');
      
      // Update display with feedback
      updateDisplay(total, today, true);
    } else {
      // Not portfolio page, or already visited portfolio - just show counts (no increment)
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
