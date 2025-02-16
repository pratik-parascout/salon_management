async function fetchStaff() {
  try {
    const res = await axios.get('/api/staff');
    const staff = res.data;
    const staffDiv = document.getElementById('staffList');
    staffDiv.innerHTML = staff
      .map(
        (s) => `
             <div>
               <strong>${s.name}</strong> - ${s.specialization}<br />
               Availability: ${JSON.stringify(s.availability)}
             </div>
             <hr />
           `
      )
      .join('');
  } catch (error) {
    console.error(error);
  }
}

document
  .getElementById('addStaffForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const name = document.getElementById('staffName').value;
      const specialization = document.getElementById(
        'staffSpecialization'
      ).value;
      let availability;
      try {
        availability = JSON.parse(
          document.getElementById('staffAvailability').value
        );
      } catch (err) {
        availability = document.getElementById('staffAvailability').value;
      }
      const res = await axios.post(
        '/api/staff',
        { name, specialization, availability },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      alert(res.data.message || 'Staff added');
      fetchStaff();
    } catch (error) {
      console.error(error);
      alert('Staff addition failed');
    }
  });

document.addEventListener('DOMContentLoaded', fetchStaff);
