const { CronJob } = require('cron');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { Appointment, User } = require('../models');

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY || 'your_brevo_api_key';
const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendReminderEmail(email, date, time) {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = {
    name: 'Salon Appointment Booking',
    email: process.env.EMAIL_USER || 'your_verified_sender_email@example.com',
  };
  sendSmtpEmail.subject = 'Appointment Reminder';
  sendSmtpEmail.htmlContent = `<html>
    <body>
      <p>This is a reminder for your appointment on <strong>${date}</strong> at <strong>${time}</strong>.</p>
    </body>
  </html>`;
  try {
    let response = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    console.log(`Reminder email sent to ${email}. Response:`, response);
  } catch (error) {
    console.error(`Error sending reminder email to ${email}:`, error);
  }
}

function scheduleReminders() {
  new CronJob(
    '0 8 * * *',
    async () => {
      console.log(
        'Cron job running: Checking for tomorrow’s appointments for reminders.'
      );

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      const appointments = await Appointment.findAll({
        where: { date: tomorrowStr, status: 'booked' },
      });

      for (const appt of appointments) {
        const user = await User.findByPk(appt.userId);
        if (user && user.email) {
          await sendReminderEmail(user.email, appt.date, appt.time);
        }
      }
    },
    null,
    true,
    'Asia/Kolkata'
  );
}

module.exports = scheduleReminders;
