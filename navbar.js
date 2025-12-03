// navbar.js - Global Navigation Bar
document.addEventListener('DOMContentLoaded', function() {
  const navbarHTML = `
    <nav class="navbar-global">
      <div class="nav-inner-global">
        <div class="logo-circle-global">
          <img src="logo.png" alt="TUP Logo">
        </div>
        
        <div class="nav-links-global">
          <a href="index.html">Home</a>
          <a href="campus.html">Campus</a>
          <a href="calendar.html">Calendar</a>
          <a href="services.html">Service Assistance</a>
          <a href="contact.html">Contact</a>
        </div>

        <div class="nav-icon-global">
          <svg class="globe-icon-global" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
      </div>
    </nav>
  `;
  
  // Insert navbar at the beginning of body
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  
  // Highlight current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links-global a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active-page');
    }
  });
});