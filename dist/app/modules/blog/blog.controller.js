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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const blog_service_1 = require("./blog.service");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = req.body;
        // will call service func to send this data
        const result = yield blog_service_1.BlogServices.createBlogIntoDB(blog);
        // send response
        res.status(200).json({
            success: true,
            message: 'Blog is created succesfull',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Someting went wrong',
            error,
        });
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { id } = req.params;
        console.log(data, id);
        // will call service func to send this data
        const result = yield blog_service_1.BlogServices.updateBlogntoDB(data, id);
        // send response
        res.status(200).json({
            success: true,
            message: 'Blog is update succesfull',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Someting went wrong',
            error,
        });
    }
});
const getAllBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // will call service func to send this data
        const result = yield blog_service_1.BlogServices.getAllBlogFromDB();
        // send response
        res.status(200).json({
            success: true,
            message: 'Blog get succesfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Someting went wrong',
            error,
        });
    }
});
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // will call service func to send this data
        const result = yield blog_service_1.BlogServices.getBlogFromDB(id);
        // send response
        res.status(200).json({
            success: true,
            message: 'Blog get succesfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Someting went wrong',
            error,
        });
    }
});
// student delete
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // will call service func to send this data
        const result = yield blog_service_1.BlogServices.deleteBlogFromDB(id);
        // send response
        res.status(200).json({
            success: true,
            message: 'Blog deleted succesful',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Someting went wrong',
            error,
        });
    }
});
exports.blogController = {
    createBlog,
    getAllBlog,
    getBlog,
    deleteBlog,
    updateBlog,
};
