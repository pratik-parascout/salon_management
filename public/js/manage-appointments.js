async function loadAppointments() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/appointments', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const appointments = res.data;
    const appointmentsDiv = document.getElementById('appointmentsList');
    appointmentsDiv.innerHTML = appointments
      .map(
        (appt) => `
          <div class="appointment">
              <p><strong>Appointment ID:</strong> ${appt.id}</p>
              <p><strong>Date:</strong> ${appt.date}</p>
              <p><strong>Time:</strong> ${appt.time}</p>
              <p><strong>Status:</strong> ${appt.status}</p>
              <button onclick="reschedule(${appt.id})">Reschedule</button>
              <button onclick="cancelAppointment(${appt.id})">Cancel</button>
              <hr>
          </div>
      `
      )
      .join('');
  } catch (error) {
    console.error(error);
  }
}

async function reschedule(appointmentId) {
  const newDate = prompt('Enter new date (YYYY-MM-DD):');
  const newTime = prompt('Enter new time (HH:MM):');
  if (newDate && newTime) {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `/api/appointments/${appointmentId}/reschedule`,
        { date: newDate, time: newTime },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      alert(res.data.message || 'Appointment rescheduled');
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert('Reschedule failed');
    }
  }
}

async function cancelAppointment(appointmentId) {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `/api/appointments/${appointmentId}/cancel`,
        {},
        { headers: { Authorization: 'Bearer ' + token } }
      );
      alert(res.data.message || 'Appointment cancelled');
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert('Cancellation failed');
    }
  }
}

document.addEventListener('DOMContentLoaded', loadAppointments);
