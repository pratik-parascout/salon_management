async function loadOptions() {
  try {
    // Load services
    const serviceRes = await axios.get('/api/services');
    const serviceSelect = document.getElementById('serviceSelect');
    serviceSelect.innerHTML = serviceRes.data
      .map((s) => `<option value="${s.id}">${s.name}</option>`)
      .join('');
    // Load staff
    const staffRes = await axios.get('/api/staff');
    const staffSelect = document.getElementById('staffSelect');
    staffSelect.innerHTML = staffRes.data
      .map((s) => `<option value="${s.id}">${s.name}</option>`)
      .join('');
  } catch (err) {
    console.error(err);
  }
}

async function bookAppointment() {
  const serviceId = document.getElementById('serviceSelect').value;
  const staffId = document.getElementById('staffSelect').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const email = document.getElementById('appointmentEmail').value;
  let paymentInfo;
  try {
    paymentInfo = JSON.parse(document.getElementById('paymentInfo').value);
  } catch (err) {
    paymentInfo = {};
  }
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      '/api/appointments',
      { serviceId, staffId, date, time, email, paymentInfo },
      { headers: { Authorization: 'Bearer ' + token } }
    );
    const result = res.data;
    if (result.razorpayOrder) {
      const options = {
        key: 'rzp_test_b7p17DaCbmsO02', // Replace with your actual Razorpay test key
        amount: result.razorpayOrder.amount,
        currency: result.razorpayOrder.currency,
        name: 'Salon Appointment Booking',
        description: 'Test Transaction',
        order_id: result.razorpayOrder.id,
        handler: function (response) {
          alert('Payment successful: ' + response.razorpay_payment_id);
          // Optionally verify the payment on the backend.
        },
        prefill: { email },
        theme: { color: '#F37254' },
      };
      const rzp = new Razorpay(options);
      rzp.open();
    } else {
      alert(result.message || 'Booking failed');
    }
  } catch (error) {
    console.error(error);
    alert('Booking failed');
  }
}

document
  .getElementById('bookAppointmentForm')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    bookAppointment();
  });

document.addEventListener('DOMContentLoaded', loadOptions);
