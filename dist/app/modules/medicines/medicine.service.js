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
exports.MedicineServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const medicine_constant_1 = require("./medicine.constant");
const medicine_schema_1 = require("./medicine.schema");
//create medicine
const createMedicineIntoDB = (medicineData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_schema_1.Medicine.create(medicineData);
    return result;
});
//Get All medicine
const getAllMedicineFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const allMedicineQuery = new QueryBuilder_1.default(medicine_schema_1.Medicine.find(), searchTerm)
        .search(medicine_constant_1.medicineSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield allMedicineQuery.modelQuery;
    const meta = yield allMedicineQuery.countTotal();
    return { result, meta };
});
const getSingleMedicine = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_schema_1.Medicine.findById(id);
    if (!result) {
        throw new AppError_1.default(404, 'This medicine not found!');
    }
    return result;
});
const deleteSingleMedicine = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const medicine = yield medicine_schema_1.Medicine.findById(id);
    if (!medicine) {
        throw new AppError_1.default(404, 'This medicine not found!');
    }
    const result = yield medicine_schema_1.Medicine.findByIdAndDelete(id);
    return result;
});
const updateSingleMedicine = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const medicineExist = yield medicine_schema_1.Medicine.findById(id);
    if (!medicineExist) {
        throw new AppError_1.default(404, 'This medicine not found!');
    }
    const result = yield medicine_schema_1.Medicine.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-__v');
    if (!result) {
        throw new AppError_1.default(400, `Medicine with ID ${id} not updated. try again`);
    }
    return result;
});
exports.MedicineServices = {
    createMedicineIntoDB,
    getAllMedicineFromDB,
    getSingleMedicine,
    deleteSingleMedicine,
    updateSingleMedicine,
};
