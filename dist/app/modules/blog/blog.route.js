"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
// will call controller function
router.post('/', blog_controller_1.blogController.createBlog);
router.get('/', blog_controller_1.blogController.getAllBlog);
router.get('/:id', blog_controller_1.blogController.getBlog);
router.delete('/:id', blog_controller_1.blogController.deleteBlog);
router.patch('/:id', blog_controller_1.blogController.updateBlog);
exports.BlogRoutes = router;
