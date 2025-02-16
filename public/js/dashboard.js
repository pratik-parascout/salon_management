async function fetchProfile() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/profile', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = res.data;
    document.getElementById('profile').innerText = JSON.stringify(
      data,
      null,
      2
    );
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', fetchProfile);
