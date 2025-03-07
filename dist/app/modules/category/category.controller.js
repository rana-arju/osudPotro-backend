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
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield category_service_1.categoryServices.createNewCategory(payload);
        res.json({
            success: true,
            message: 'Your category added successful',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryServices.getAllCategoryFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Category retrieved successfully',
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryServices.deleteSingleCategory(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Category deleted successfully',
        success: true,
        data: result,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryServices.updateSingleCategory(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Category updated successfully',
        success: true,
        data: result,
    });
}));
const getSingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryServices.getSingleCategory(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Category get successfully',
        success: true,
        data: result,
    });
}));
exports.CategoryController = {
    createCategory,
    getAllCategory,
    deleteCategory,
    getSingleCategory,
    updateCategory,
};
