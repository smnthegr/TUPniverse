document.addEventListener('DOMContentLoaded', function() {
    // 1. DEFINE THE HTML
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
          <div class="profile-container">
              <div class="profile-trigger" onclick="toggleProfileDropdown(event)">
                 <img id="navProfileImg" src="https://ui-avatars.com/api/?name=T&background=random" alt="Profile">
              </div>
              <div id="profileDropdown" class="profile-dropdown">
                  <div class="dropdown-header">
                      <div class="name-badge-row">
                          <p id="dropdownName" class="user-name">Loading...</p>
                          <span id="userRoleBadge" class="role-badge">...</span>
                      </div>
                      <p id="dropdownEmail" class="user-email">Waiting for data...</p>
                  </div>
                  <div class="dropdown-divider"></div>
                  <button onclick="handleLogout()" class="dropdown-item logout-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Sign Out
                  </button>
              </div>
          </div>
        </div>
      </nav>
    `;

    // 2. INJECT INTO BODY (This is the "Where"!)
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 3. HIGHLIGHT ACTIVE PAGE
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links-global a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active-page');
        }
    });

    // 4. CLOSE DROPDOWN ON OUTSIDE CLICK
    document.addEventListener('click', function(e) {
        const container = document.querySelector('.profile-container');
        const dropdown = document.getElementById('profileDropdown');
        if (container && dropdown && !container.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // 5. UNIVERSAL PROFILE & ROLE UPDATER (Firebase logic inside Listener)
    if (typeof firebase !== 'undefined') {
        const db = firebase.firestore(); 
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const navImg = document.getElementById('navProfileImg');
                const nameTxt = document.getElementById('dropdownName');
                const emailTxt = document.getElementById('dropdownEmail');
                const roleBadge = document.getElementById('userRoleBadge');

                if (navImg && user.photoURL) navImg.src = user.photoURL;
                if (nameTxt) nameTxt.textContent = user.displayName || "User";
                if (emailTxt) emailTxt.textContent = user.email;

                db.collection('users').doc(user.uid).get().then((doc) => {
                    if (doc.exists && roleBadge) {
                        const role = doc.data().role || 'User';
                        roleBadge.textContent = role;
                        roleBadge.classList.add(role.toLowerCase() === 'admin' ? 'admin-role' : 'user-role');
                    }
                }).catch(() => {
                    if(roleBadge) roleBadge.textContent = "User"; 
                });
            }
        });
    }
});

// These stay outside as global functions
window.toggleProfileDropdown = function(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

window.handleLogout = function() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'login.html';
    });
}
