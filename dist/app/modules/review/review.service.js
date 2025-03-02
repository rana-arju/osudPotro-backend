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
exports.reviewServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const review_schema_1 = require("./review.schema");
//create medicine
const createNewReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_schema_1.Review.create(reviewData);
    return result;
});
//Get All medicine
const getAllReviewFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const allReviewQuery = new QueryBuilder_1.default(review_schema_1.Review.find(), searchTerm)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield allReviewQuery.modelQuery;
    const meta = yield allReviewQuery.countTotal();
    return { result, meta };
});
const deleteSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_schema_1.Review.findById(id);
    if (!review) {
        throw new AppError_1.default(404, 'This review not found!');
    }
    const result = yield review_schema_1.Review.findByIdAndDelete(id);
    return result;
});
exports.reviewServices = {
    createNewReview,
    getAllReviewFromDB,
    deleteSingleReview,
};
