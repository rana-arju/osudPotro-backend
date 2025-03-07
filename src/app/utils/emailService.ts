import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: config.node_env === 'production',
  auth: {
    user: config.email_user,
    pass: config.email_pass,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: '',
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

export const sendLowStockNotification = async (
  medicineName: string,
  currentStock: number,
) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const subject = 'Low Stock Alert';
  const html = `
    <h1>Low Stock Alert</h1>
    <p>The stock for ${medicineName} is running low. Current stock: ${currentStock}</p>
    <p>Please restock soon.</p>
  `;

  return sendEmail(adminEmail!, subject, html);
};

export const sendOrderUpdateNotification = async (
  userEmail: string,
  orderId: string,
  newStatus: string,
) => {
  const subject = 'Order Status Update';
  const html = `
    <h1>Order Status Update</h1>
    <p>Your order (ID: ${orderId}) has been updated to: ${newStatus}</p>
    <p>Thank you for shopping with us!</p>
  `;

  return sendEmail(userEmail, subject, html);
};
