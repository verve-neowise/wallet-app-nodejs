"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, req, res, next) {
    res.status(500).json({
        message: "Internal Server Error",
        error: error
    });
}
exports.default = default_1;
