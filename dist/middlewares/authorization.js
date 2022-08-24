"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_service_1 = __importDefault(require("../services/jwt.service"));
const util_1 = require("../util");
exports.default = (requiredRoles) => {
    return (req, res, next) => {
        let token = req.header('Authorization');
        if (!token) {
            (0, util_1.error)(`token not provided`);
            return res.status(401).send({ message: 'Token not provided' });
        }
        (0, util_1.error)(`provided token ${token}`);
        let payload = jwt_service_1.default.validate(token);
        if (payload == null) {
            (0, util_1.error)(`token not provided`);
            return res.status(401).send({ message: 'Token is not valid.' });
        }
        (0, util_1.info)(`token is valid`);
        if (requiredRoles && !requiredRoles.includes(payload.role)) {
            (0, util_1.error)(`user role does not match required role: user=${payload.role}, required=${requiredRoles}`);
            return res.status(401).send({ message: 'Access denied.' });
        }
        if (requiredRoles) {
            (0, util_1.info)('user role matches required role');
        }
        else {
            (0, util_1.info)('user authorized without role');
        }
        (0, util_1.info)('store payload for next middleware');
        res.locals.payload = payload;
        next();
    };
};
