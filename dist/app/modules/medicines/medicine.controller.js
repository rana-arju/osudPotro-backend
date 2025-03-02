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
exports.medicineController = void 0;
const medicine_service_1 = require("./medicine.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createMedicine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield medicine_service_1.MedicineServices.createMedicineIntoDB(payload);
        res.json({
            status: true,
            message: 'New medicine added successful',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllMedicine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_service_1.MedicineServices.getAllMedicineFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Medicine retrieved successfully',
        data: result === null || result === void 0 ? void 0 : result.result,
        meta: result === null || result === void 0 ? void 0 : result.meta,
    });
}));
// Single Product get controller
const getSingleMedicine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield medicine_service_1.MedicineServices.getSingleMedicine(id);
        res.json({
            status: true,
            message: 'Medicine retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// student delete
const deleteMedicine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield medicine_service_1.MedicineServices.deleteSingleMedicine(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Medicine deleted successfully',
        success: true,
        data: result,
    });
}));
const updatMedicine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payload = req.body;
        const result = yield medicine_service_1.MedicineServices.updateSingleMedicine(id, payload);
        res.json({
            status: true,
            message: 'Medicine updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.medicineController = {
    createMedicine,
    getAllMedicine,
    getSingleMedicine,
    deleteMedicine,
    updatMedicine,
};
