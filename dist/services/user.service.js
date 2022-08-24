"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
async function create(data) {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedPassword = bcryptjs_1.default.hashSync(data.password, salt);
    const user = await config_1.client.user.create({
        data: {
            username: data.username,
            password: hashedPassword,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
        }
    });
    return user;
}
async function findByUsername(username) {
    return config_1.client.user.findFirst({
        where: {
            username
        }
    });
}
async function isUsernameAvailable(username) {
    const count = await config_1.client.user.count({
        where: {
            username
        }
    });
    return count === 0;
}
exports.default = {
    create,
    findByUsername,
    isUsernameAvailable
};
