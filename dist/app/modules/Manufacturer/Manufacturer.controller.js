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
exports.ManufacturerController = void 0;
const Manufacturer_service_1 = require("./Manufacturer.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createManufacturer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield Manufacturer_service_1.manufacturerServices.createNewManufacturer(payload);
        res.json({
            success: true,
            message: 'Your Manufacturer added successful',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllManufacturer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Manufacturer_service_1.manufacturerServices.getAllManufacturerFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Manufacturer retrieved successfully',
        data: result,
    });
}));
const getAllMedicineFromManufacturer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Manufacturer_service_1.manufacturerServices.getAllMedicineWithManufacturerFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Medicines successfully',
        data: result,
    });
}));
const deleteManufacturer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Manufacturer_service_1.manufacturerServices.deleteSingleManufacturer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Manufacturer deleted successfully',
        success: true,
        data: result,
    });
}));
const updateManufacturer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Manufacturer_service_1.manufacturerServices.updateSingleManufacturer(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Manufacturer updated successfully',
        success: true,
        data: result,
    });
}));
const getSingleManufacturer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Manufacturer_service_1.manufacturerServices.getSingleManufacturer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Manufacturer get successfully',
        success: true,
        data: result,
    });
}));
exports.ManufacturerController = {
    createManufacturer,
    getAllManufacturer,
    deleteManufacturer,
    getSingleManufacturer,
    updateManufacturer,
    getAllMedicineFromManufacturer,
};
