"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderUpdateNotification = exports.sendLowStockNotification = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config_1.default.node_env === 'production',
    auth: {
        user: config_1.default.email_user,
        pass: config_1.default.email_pass,
    },
});
const sendEmail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: '',
        html,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        return info;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
});
exports.sendEmail = sendEmail;
const sendLowStockNotification = (medicineName, currentStock) => __awaiter(void 0, void 0, void 0, function* () {
    const adminEmail = process.env.ADMIN_EMAIL;
    const subject = 'Low Stock Alert';
    const html = `
    <h1>Low Stock Alert</h1>
    <p>The stock for ${medicineName} is running low. Current stock: ${currentStock}</p>
    <p>Please restock soon.</p>
  `;
    return (0, exports.sendEmail)(adminEmail, subject, html);
});
exports.sendLowStockNotification = sendLowStockNotification;
const sendOrderUpdateNotification = (userEmail, orderId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Order Status Update';
    const html = `
    <h1>Order Status Update</h1>
    <p>Your order (ID: ${orderId}) has been updated to: ${newStatus}</p>
    <p>Thank you for shopping with us!</p>
  `;
    return (0, exports.sendEmail)(userEmail, subject, html);
});
exports.sendOrderUpdateNotification = sendOrderUpdateNotification;
