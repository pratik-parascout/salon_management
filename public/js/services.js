async function fetchServices() {
  try {
    const res = await axios.get('/api/services');
    const services = res.data;
    const servicesDiv = document.getElementById('servicesList');
    servicesDiv.innerHTML = services
      .map(
        (s) => `
             <div>
               <strong>${s.name}</strong><br />
               ${s.description}<br />
               Duration: ${s.duration} mins | Price: Rs.${s.price}
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
  .getElementById('createServiceForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const name = document.getElementById('serviceName').value;
      const description = document.getElementById('serviceDescription').value;
      const duration = document.getElementById('serviceDuration').value;
      const price = document.getElementById('servicePrice').value;
      const res = await axios.post(
        '/api/services',
        { name, description, duration, price },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      alert(res.data.message || 'Service created');
      fetchServices();
    } catch (error) {
      console.error(error);
      alert('Service creation failed');
    }
  });

document.addEventListener('DOMContentLoaded', fetchServices);
