"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manufacturer = void 0;
const mongoose_1 = require("mongoose");
const manufacturerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });
// Create the model
exports.Manufacturer = (0, mongoose_1.model)('Manufacturer', manufacturerSchema);
