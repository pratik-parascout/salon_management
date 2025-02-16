document
  .getElementById('registerForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const adminCode = document.getElementById('adminCode').value;
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        adminCode,
      });
      const data = res.data;
      if (data.message) {
        alert(data.message);
        window.location.href = 'login.html';
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  });
