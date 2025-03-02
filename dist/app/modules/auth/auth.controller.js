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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield auth_service_1.authServices.loginUsertIntoDB(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
        sameSite: 'none',
    });
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'user logged in successful',
        data: {
            accessToken,
        },
    });
}));
const registrationUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const result = yield auth_service_1.authServices.createUser(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'user registration in successful',
        data: {
            accessToken,
        },
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield auth_service_1.authServices.getMeFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'get me succesfully',
        data: result,
    });
}));
// All Order get controller
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Users get successfully',
        success: true,
        data: result,
    });
}));
const deleteByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield auth_service_1.authServices.deleteUserFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User is deleted succesfully',
        data: result,
    });
}));
const roleUpdateByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    const result = yield auth_service_1.authServices.userRoleUpdate(id, role);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Role updated succesfully',
        data: result,
    });
}));
const statusUpdateByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const result = yield auth_service_1.authServices.userStatusUpdate(id, status);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Status updated succesfully',
        data: result,
    });
}));
const profileUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield auth_service_1.authServices.profileUpdate(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Profile updated succesfully',
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service func to send this data
    const passwordData = __rest(req.body, []);
    const userData = req === null || req === void 0 ? void 0 : req.user;
    const result = yield auth_service_1.authServices.passwordChnageIntoDB(userData, passwordData);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Password updated successful',
        data: result,
    });
}));
exports.authController = {
    getMe,
    loginUser,
    getAllUsers,
    changePassword,
    profileUpdate,
    deleteByAdmin,
    registrationUser,
    roleUpdateByAdmin,
    statusUpdateByAdmin,
};
