console.log('Frontend loaded');

function getUserRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (e) {
    return null;
  }
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.getElementById('mainNav');
  let navHTML = '';

  if (!isLoggedIn()) {
    navHTML = `
      <a href="index.html">Home</a> |
      <a href="login.html">Login</a> |
      <a href="register.html">Register</a>
    `;
  } else {
    const role = getUserRole();
    navHTML = `
      <a href="index.html">Home</a> |
      <a href="dashboard.html">Dashboard</a> |
      <a href="profile.html">Profile</a> |
      <a href="services.html">Services</a> |
      <a href="book-appointment.html">Book Appointment</a> |
      <a href="reviews.html">Reviews</a>
    `;
    if (role === 'admin') {
      navHTML += ` | <a href="admin-dashboard.html">Admin Dashboard</a>
                   | <a href="staff.html">Manage Staff</a>`;
    }
    navHTML += ` | <a href="#" id="logoutLink">Logout</a>`;
  }

  if (navBar) {
    navBar.innerHTML = navHTML;
  }

  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }
});
