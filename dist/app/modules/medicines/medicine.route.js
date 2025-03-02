"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineRoutes = void 0;
const express_1 = __importDefault(require("express"));
const medicine_controller_1 = require("./medicine.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const medicine_validation_1 = require("./medicine.validation");
const router = express_1.default.Router();
// will call controller function
router.post('/', (0, validationRequest_1.default)(medicine_validation_1.medicineValidationSchema), medicine_controller_1.medicineController.createMedicine);
router.get('/', medicine_controller_1.medicineController.getAllMedicine);
router.get('/:id', medicine_controller_1.medicineController.getSingleMedicine);
router.delete('/:id', medicine_controller_1.medicineController.deleteMedicine);
router.patch('/:id', (0, validationRequest_1.default)(medicine_validation_1.medicineValidationSchema), medicine_controller_1.medicineController.updatMedicine);
exports.MedicineRoutes = router;
