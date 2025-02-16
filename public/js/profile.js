async function loadProfile() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/profile', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const profile = res.data;
    document.getElementById('profileData').innerText = JSON.stringify(
      profile,
      null,
      2
    );
  } catch (error) {
    console.error(error);
  }
}

document
  .getElementById('updateProfileForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const username = document.getElementById('newUsername').value;
      const email = document.getElementById('newEmail').value;
      const res = await axios.put(
        '/api/profile',
        { username, email },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      alert(res.data.message || 'Profile updated');
      loadProfile();
    } catch (error) {
      console.error(error);
      alert('Profile update failed');
    }
  });

document.addEventListener('DOMContentLoaded', loadProfile);
