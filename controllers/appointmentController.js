const { Service } = require('../models');
const Razorpay = require('razorpay');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const appointmentService = require('../services/appointmentService');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY || 'your_test_key',
  key_secret: process.env.RAZORPAY_SECRET || 'your_test_secret',
});

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY || 'your_brevo_api_key';
const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendConfirmationEmail(email, date, time, invoice) {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = {
    name: 'Salon Appointment Booking',
    email: process.env.EMAIL_USER || 'your_verified_sender_email@example.com',
  };
  sendSmtpEmail.subject = 'Appointment Confirmation';
  sendSmtpEmail.htmlContent = `<html>
    <body>
      <p>Your appointment is confirmed for <strong>${date}</strong> at <strong>${time}</strong>.</p>
      <p>Invoice: <strong>${invoice || 'N/A'}</strong></p>
    </body>
  </html>`;
  try {
    let response = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    console.log('Confirmation email sent. Response:', response);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

exports.bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { serviceId, staffId, date, time, email, paymentInfo } = req.body;

    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(400).json({ message: 'Service not found' });
    const amount = parseFloat(service.price) * 100;

    // Create a Razorpay order
    const options = {
      amount,
      currency: 'INR',
      receipt: 'receipt_order_' + Date.now(),
      payment_capture: 1,
    };
    const order = await razorpayInstance.orders.create(options);
    const invoice = 'INV-' + Date.now();

    const appointmentData = {
      userId,
      serviceId,
      staffId,
      date,
      time,
      status: 'booked',
      paymentInfo: { razorpayOrderId: order.id, ...paymentInfo },
      invoice,
    };
    const appointment = await appointmentService.createAppointment(
      appointmentData
    );

    // Send confirmation email using Brevo
    sendConfirmationEmail(email, date, time, invoice);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointmentId: appointment.id,
      razorpayOrder: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.toString() });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    // (You can keep this as-is or later refactor it further into a service.)
    const appointments = await Appointment.findAll({
      where: { userId },
      include: [
        {
          model: require('../models').Service,
          attributes: ['name', 'description', 'duration', 'price'],
        },
        {
          model: require('../models').Staff,
          attributes: ['name', 'specialization'],
        },
      ],
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { date, time } = req.body;
    await appointmentService.rescheduleAppointment(appointmentId, {
      date,
      time,
    });
    res.json({ message: 'Appointment rescheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await appointmentService.cancelAppointment(appointmentId);
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
