"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    console.error(`${req.method} '${req.baseUrl}'`);
    next();
}
exports.default = default_1;
