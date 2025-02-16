document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const appointmentId = document.getElementById('appointmentId').value;
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;
  try {
    const res = await axios.post(
      '/api/reviews',
      { appointmentId, rating, comment },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    alert(res.data.message || 'Review submitted');
  } catch (error) {
    console.error(error);
    alert('Review submission failed');
  }
});
