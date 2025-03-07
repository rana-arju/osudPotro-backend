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
exports.manufacturerServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const medicine_schema_1 = require("../medicines/medicine.schema");
const Manufacturer_schema_1 = require("./Manufacturer.schema");
//create medicine
const createNewManufacturer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Manufacturer_schema_1.Manufacturer.create(payload);
    return result;
});
//Get All manufacturer
const getAllManufacturerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Manufacturer_schema_1.Manufacturer.find();
    return result;
});
//Get All medicine
const getAllMedicineWithManufacturerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_schema_1.Medicine.find({ manufacturer: id }).populate('category')
        .populate('manufacturer');
    return result;
});
const deleteSingleManufacturer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const manufacturer = yield Manufacturer_schema_1.Manufacturer.findById(id);
    if (!manufacturer) {
        throw new AppError_1.default(404, 'This Manufacturer not found!');
    }
    const result = yield Manufacturer_schema_1.Manufacturer.findByIdAndDelete(id);
    return result;
});
const updateSingleManufacturer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const manufacturer = yield Manufacturer_schema_1.Manufacturer.findById(id);
    if (!manufacturer) {
        throw new AppError_1.default(404, 'This Manufacturer not found!');
    }
    const result = yield Manufacturer_schema_1.Manufacturer.findByIdAndUpdate(id, payload);
    return result;
});
const getSingleManufacturer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const manufacturer = yield Manufacturer_schema_1.Manufacturer.findById(id);
    if (!manufacturer) {
        throw new AppError_1.default(404, 'This Manufacturer not found!');
    }
    const result = yield Manufacturer_schema_1.Manufacturer.findById(id);
    return result;
});
exports.manufacturerServices = {
    createNewManufacturer,
    getAllManufacturerFromDB,
    getSingleManufacturer,
    deleteSingleManufacturer,
    updateSingleManufacturer,
    getAllMedicineWithManufacturerFromDB,
};
