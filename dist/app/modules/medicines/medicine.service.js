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
const emailService_1 = require("../../utils/emailService");
const medicine_constant_1 = require("./medicine.constant");
const medicine_schema_1 = require("./medicine.schema");
const LOW_STOCK_THRESHOLD = 5; // Set this to your desired threshold
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
    // Add populate directly here (you could also add it inside QueryBuilder if needed)
    allMedicineQuery.modelQuery = allMedicineQuery.modelQuery.populate('category')
        .populate('manufacturer');
    const result = yield allMedicineQuery.modelQuery;
    const meta = yield allMedicineQuery.countTotal();
    return { result, meta };
});
const getSingleMedicine = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield medicine_schema_1.Medicine.findById(id)
        .populate('category')
        .populate('manufacturer');
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
    })
        .populate('category')
        .populate('manufacturer');
    if (!result) {
        throw new AppError_1.default(400, `Medicine with ID ${id} not updated. try again`);
    }
    // Check if stock is low after update
    if (result.quantity <= LOW_STOCK_THRESHOLD) {
        try {
            yield (0, emailService_1.sendLowStockNotification)(result.name, result.quantity);
        }
        catch (error) {
            console.error('Failed to send low stock notification:', error);
        }
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
