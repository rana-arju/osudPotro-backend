"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const medicine_route_1 = require("./app/modules/medicines/medicine.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const review_route_1 = require("./app/modules/review/review.route");
const Manufacturer_route_1 = require("./app/modules/Manufacturer/Manufacturer.route");
const category_route_1 = require("./app/modules/category/category.route");
const notFound_1 = require("./app/middleware/notFound");
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const orders_route_1 = require("./app/modules/orders/orders.route");
const blog_route_1 = require("./app/modules/blog/blog.route");
const app = (0, express_1.default)();
//json parser
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://osud-potro.vercel.app'],
    credentials: true,
}));
// application routes
app.use('/api/v1/medicine', medicine_route_1.MedicineRoutes);
app.use('/api/v1/auth', auth_route_1.authRoutes);
app.use('/api/v1/review', review_route_1.ReviewRoutes);
app.use('/api/v1/manufacturer', Manufacturer_route_1.ManufacturerRoutes);
app.use('/api/v1/category', category_route_1.CategoryRoutes);
app.use('/api/v1/order', orders_route_1.OrderRoutes);
app.use('/api/v1/blog', blog_route_1.BlogRoutes);
app.get('/', (req, res) => {
    res.send('Server is Working...');
});
app.use(globalErrorHandler_1.globalErrorHandler);
//Not Found
app.use(notFound_1.notFound);
exports.default = app;
