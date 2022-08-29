"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFromQuery = exports.error = exports.info = void 0;
const moment_1 = __importDefault(require("moment"));
function info(message) {
    console.log(`[INFO] ${message}`);
}
exports.info = info;
function error(message) {
    console.log(`[ERROR] ${message}`);
}
exports.error = error;
function dateFromQuery(param) {
    return param ? (0, moment_1.default)(param, "YYYY-MM-DD").toDate() : undefined;
}
exports.dateFromQuery = dateFromQuery;
