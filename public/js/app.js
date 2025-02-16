document.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    const token = localStorage.getItem('token');
    let navHTML = '';
    if (!token) {
      navHTML = `<a href="index.html">Home</a> | <a href="login.html">Login</a> | <a href="register.html">Register</a>`;
    } else {
      let role = null;
      try {
        role = JSON.parse(atob(token.split('.')[1])).role;
      } catch (e) {}
      navHTML = `<a href="index.html">Home</a> | <a href="dashboard.html">Dashboard</a> | <a href="profile.html">Profile</a> | <a href="book-appointment.html">Book Appointment</a> | <a href="reviews.html">Reviews</a>`;
      if (role === 'admin') {
        navHTML += ` | <a href="admin-dashboard.html">Admin Dashboard</a> | <a href="staff.html">Manage Staff</a>`;
      }
      navHTML += ` | <a href="#" id="logoutLink">Logout</a>`;
    }
    mainNav.innerHTML = navHTML;

    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = 'index.html';
      });
    }
  }
});
