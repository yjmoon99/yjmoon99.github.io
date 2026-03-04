(function() {
  'use strict';
  
  function filterProjects(filter) {
    var items = document.querySelectorAll('.portfolio-item');
    var buttons = document.querySelectorAll('.project-filter-btn');
    var i, item, category;
    
    // Update button states
    for (i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute('data-filter') === filter) {
        buttons[i].classList.add('active');
      } else {
        buttons[i].classList.remove('active');
      }
    }
    
    // Filter items
    for (i = 0; i < items.length; i++) {
      item = items[i];
      category = item.getAttribute('data-category');
      
      if (!category) {
        category = 'tapeout';
      }
      
      if (category === filter) {
        item.classList.remove('hidden');
        item.style.display = '';
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    }
  }
  
  function initProjectFilter() {
    var btnTapeout = document.getElementById('btn-tapeout');
    var btnSimulation = document.getElementById('btn-simulation');
    
    if (!btnTapeout || !btnSimulation) {
      setTimeout(initProjectFilter, 50);
      return;
    }
    
    // Add click handlers
    btnTapeout.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      filterProjects('tapeout');
    });
    
    btnSimulation.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      filterProjects('simulation');
    });
    
    // Set initial filter to tapeout
    filterProjects('tapeout');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectFilter);
  } else {
    initProjectFilter();
  }
  
  // Also try on window load as backup
  window.addEventListener('load', initProjectFilter);
})();
