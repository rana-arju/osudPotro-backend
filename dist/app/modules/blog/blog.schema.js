"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
    content: {
        type: String,
        required: [true, 'Content is required.'],
    },
    tags: {
        type: [String],
        required: [true, "Tags required!"]
    },
    image: { type: String, required: true },
}, { timestamps: true });
// Query middleware
blogSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
blogSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
// Create the model
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
