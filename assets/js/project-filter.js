window.filterProjects = function(filter) {
  var items = document.querySelectorAll('.portfolio-item');
  var buttons = document.querySelectorAll('.project-filter-btn');
  var i, item, category;
  
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute('data-filter') === filter) {
      buttons[i].classList.add('active');
    } else {
      buttons[i].classList.remove('active');
    }
  }
  
  for (i = 0; i < items.length; i++) {
    item = items[i];
    category = item.getAttribute('data-category') || 'tapeout';
    
    if (category === filter) {
      item.classList.remove('hidden');
      item.classList.add('show-item');
    } else {
      item.classList.add('hidden');
      item.classList.remove('show-item');
    }
  }
};
