const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL, // Your email from the .env file
    pass: process.env.PASSWORD, // Your email password from the .env file
  },
});

// Define POST route to send the email
app.post('/send', async (req, res) => {
  const { user_name, user_email, user_phone, message, writingFor } = req.body;

  if (!user_name || !user_email || !user_phone || !message || !writingFor) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email options for sending to the admin
  const adminMailOptions = {
    from: user_email, // Sender's email
    to: process.env.EMAIL, // Admin email from the .env file
    subject: `New Contact Form Submission from ${user_name}`,
    text: `You have received a new message from your website contact form. \n\nHere are the details:\n\nName: ${user_name}\nEmail: ${user_email}\nPhone: ${user_phone}\nWriting us for: ${writingFor}\nMessage: ${message}`,
  };

  // Thank you email to the user
  const userMailOptions = {
    from: process.env.EMAIL, // Admin email (same as above)
    to: user_email, // Sending thank-you email to the user
    subject: 'Thank you for contacting us!',
    text: `Dear ${user_name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Mercellenie Team`,
  };

  try {
    // Send email to admin
    await transporter.sendMail(adminMailOptions);
    // Send thank-you email to the user
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// const PORT = process.env.PORT || 3001;
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Configure nodemailer for sending emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// app.post('/send', (req, res) => {
//   const { user_name, user_email, user_phone, message, writingFor } = req.body;

//   if (!user_name || !user_email || !user_phone || !message || !writingFor) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Send email to admin
//   const adminMailOptions = {
//     from: user_email,
//     to: process.env.EMAIL, // Admin email
//     subject: `New Contact Form Submission from ${user_name}`,
//     text: `
//       Name: ${user_name}
//       Email: ${user_email}
//       Phone: ${user_phone}
//       Writing For: ${writingFor}
//       Message: ${message}
//     `,
//   };

//   // Send thank-you email to the user
//   const userMailOptions = {
//     from: process.env.EMAIL, // Your email
//     to: user_email,
//     subject: 'Thank you for contacting us!',
//     text: `Dear ${user_name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Mercellenie Team`,
//   };

//   // Send both emails
//   transporter.sendMail(adminMailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error sending email to admin' });
//     }

//     transporter.sendMail(userMailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: 'Error sending thank-you email to user' });
//       }

//       res.status(200).json({ message: 'Emails sent successfully!' });
//     });
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// app.post('/send', (req, res) => {
//   const { name, email, phone, message, writingFor } = req.body;

//   const mailOptions = {
//     from: email,
//     to: process.env.RECEIVER_EMAIL,
//     subject: `New Contact Form Submission from ${name}`,
//     text: `You have received a new message from your website contact form. \n\nHere are the details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nWriting us for: ${writingFor}\nMessage: ${message}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Something went wrong.');
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.status(200).send('Email sent successfully');
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
