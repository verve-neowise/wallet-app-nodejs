"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, req, res, next) {
    console.error(`${req.method} '${req.baseUrl}': ${error}`);
}
exports.default = default_1;
