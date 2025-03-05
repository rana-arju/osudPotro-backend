"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_interface_1 = require("../auth/auth.interface");
const router = (0, express_1.Router)();
router.get('/revenue', orders_controller_1.orderController.totalRevenue);
router.get('/myOrder', (0, auth_1.default)(auth_interface_1.USER_ROLE.customer, auth_interface_1.USER_ROLE.admin), orders_controller_1.orderController.getMyOrder);
router.get('/verify', (0, auth_1.default)(auth_interface_1.USER_ROLE.customer, auth_interface_1.USER_ROLE.admin), orders_controller_1.orderController.verifyPayment);
router.patch('/status/:productId', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), orders_controller_1.orderController.orderStatusUpdate);
router.get('/:productId', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin, auth_interface_1.USER_ROLE.customer), orders_controller_1.orderController.getSingleOrder);
router.put('/:productId', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin, auth_interface_1.USER_ROLE.customer), orders_controller_1.orderController.updateOrder);
router.delete('/:productId', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin, auth_interface_1.USER_ROLE.customer), orders_controller_1.orderController.deleteOrder);
router.post('/', (0, auth_1.default)(auth_interface_1.USER_ROLE.customer, auth_interface_1.USER_ROLE.admin), orders_controller_1.orderController.placeOrder);
router.get('/', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), orders_controller_1.orderController.getAllOrder);
exports.OrderRoutes = router;
