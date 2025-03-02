"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_interface_1 = require("../auth/auth.interface");
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
// will call controller function
router.post('/', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), (0, validationRequest_1.default)(category_validation_1.categoryValidationSchema), category_controller_1.CategoryController.createCategory);
router.get('/', category_controller_1.CategoryController.getAllCategory);
router.get('/:id', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin, auth_interface_1.USER_ROLE.customer), category_controller_1.CategoryController.getSingleCategory);
router.delete('/:id', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
