function checkAdminRole() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'admin';
  } catch (e) {
    return false;
  }
}

if (!checkAdminRole()) {
  alert('Access denied. Admins only.');
  window.location.href = 'dashboard.html';
}

// Fetch and display customers
async function fetchCustomers() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/admin/customers', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const customers = res.data;
    const customersDiv = document.getElementById('customersList');
    if (!Array.isArray(customers) || customers.length === 0) {
      customersDiv.innerHTML = '<p>No customers found.</p>';
    } else {
      customersDiv.innerHTML = customers
        .map(
          (c) => `
          <div class="customer">
            <p><strong>ID:</strong> ${c.id}</p>
            <p><strong>Username:</strong> ${c.username}</p>
            <p><strong>Email:</strong> ${c.email}</p>
          </div>
          <hr />
        `
        )
        .join('');
    }
  } catch (error) {
    console.error(error);
  }
}

// Fetch and display appointments
async function fetchAppointments() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/admin/appointments', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const appointments = res.data;
    const appointmentsDiv = document.getElementById('appointmentsList');
    if (!Array.isArray(appointments) || appointments.length === 0) {
      appointmentsDiv.innerHTML = '<p>No appointments found.</p>';
    } else {
      appointmentsDiv.innerHTML = appointments
        .map(
          (a) => `
          <div class="appointment">
            <p><strong>Appointment ID:</strong> ${a.id}</p>
            <p><strong>User ID:</strong> ${a.userId}</p>
            <p><strong>Service ID:</strong> ${a.serviceId}</p>
            <p><strong>Staff ID:</strong> ${a.staffId}</p>
            <p><strong>Date:</strong> ${a.date}</p>
            <p><strong>Time:</strong> ${a.time}</p>
            <p><strong>Status:</strong> ${a.status}</p>
            <button onclick="updateAppointment(${a.id})">Update Appointment</button>
          </div>
          <hr />
        `
        )
        .join('');
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateAppointment(appointmentId) {
  const newDate = prompt('Enter new date (YYYY-MM-DD):');
  const newTime = prompt('Enter new time (HH:MM):');
  const newStatus = prompt('Enter new status (e.g., confirmed, cancelled):');
  if (newDate && newTime && newStatus) {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `/api/admin/appointments/${appointmentId}`,
        { date: newDate, time: newTime, status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      alert(res.data.message || 'Appointment updated');
      fetchAppointments();
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCustomers();
  fetchAppointments();
});
