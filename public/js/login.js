document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    const data = res.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Login successful');
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error(error);
    alert('Login failed');
  }
});
