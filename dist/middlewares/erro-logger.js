"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorLogger(error, req, res, next) {
    console.error(`${req.method} '${req.baseUrl}': ${error}`);
}
exports.default = errorLogger;
