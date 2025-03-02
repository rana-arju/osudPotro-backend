"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const review_validation_1 = require("./review.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
// will call controller function
router.post('/', (0, auth_1.default)('customer', 'admin'), (0, validationRequest_1.default)(review_validation_1.reviewValidationSchema), review_controller_1.medicineController.createReview);
router.get('/', review_controller_1.medicineController.getAllReview);
router.delete('/:id', (0, auth_1.default)("customer", "admin"), review_controller_1.medicineController.deleteReview);
exports.ReviewRoutes = router;
