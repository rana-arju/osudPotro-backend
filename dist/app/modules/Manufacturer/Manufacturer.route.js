"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Manufacturer_controller_1 = require("./Manufacturer.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const Manufacturer_validation_1 = require("./Manufacturer.validation");
const auth_interface_1 = require("../auth/auth.interface");
const router = express_1.default.Router();
// will call controller function
router.post('/', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), (0, validationRequest_1.default)(Manufacturer_validation_1.manufacturerValidationSchema), Manufacturer_controller_1.ManufacturerController.createManufacturer);
router.get('/', Manufacturer_controller_1.ManufacturerController.getAllManufacturer);
router.get('/medicines/:id', Manufacturer_controller_1.ManufacturerController.getAllMedicineFromManufacturer);
router.get('/:id', Manufacturer_controller_1.ManufacturerController.getSingleManufacturer);
router.delete('/:id', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), Manufacturer_controller_1.ManufacturerController.deleteManufacturer);
router.patch('/:id', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), Manufacturer_controller_1.ManufacturerController.updateManufacturer);
exports.ManufacturerRoutes = router;
