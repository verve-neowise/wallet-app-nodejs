"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = void 0;
function info(message) {
    console.log(`[INFO] ${message}`);
}
exports.info = info;
function error(message) {
    console.log(`[ERROR] ${message}`);
}
exports.error = error;
