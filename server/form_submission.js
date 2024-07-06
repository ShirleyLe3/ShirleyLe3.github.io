const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// POST route for handling form submission
app.post('/submit_form', (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'shirley.lee10100@gmail.com', // Replace with your Gmail address
      pass: 'your_password' // Replace with your Gmail password
    }
  });
/*
const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
}); */

  // Setup email data
  const mailOptions = {
    from: 'your_email@gmail.com', // Sender address
    to: 'shirley.lee10100@gmail.com', // Replace with recipient email address
    subject: 'Message Inquiry to Web Developer', // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Error occurred. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Message sent successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
