import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send order confirmation email
const sendOrderConfirmation = async (userEmail, orderDetails) => {
  const subject = 'Order Confirmation - Whimsical Presents';
  const message = `
    <h2>Thank you for your order!</h2>
    <p>Your order has been placed successfully.</p>
    <p><strong>Order ID:</strong> ${orderDetails._id}</p>
    <p><strong>Total Amount:</strong> $${orderDetails.totalAmount}</p>
    <p>We will process your order shortly.</p>
  `;

  return await sendEmail({
    email: userEmail,
    subject,
    message,
  });
};

// Send payment confirmation email
const sendPaymentConfirmation = async (userEmail, paymentDetails) => {
  const subject = 'Payment Confirmation - Whimsical Presents';
  const message = `
    <h2>Payment Successful!</h2>
    <p>Your payment has been processed successfully.</p>
    <p><strong>Transaction ID:</strong> ${paymentDetails.transactionId}</p>
    <p><strong>Amount:</strong> $${paymentDetails.amount}</p>
    <p>Thank you for shopping with us!</p>
  `;

  return await sendEmail({
    email: userEmail,
    subject,
    message,
  });
};

export {
  sendEmail,
  sendOrderConfirmation,
  sendPaymentConfirmation,
};
