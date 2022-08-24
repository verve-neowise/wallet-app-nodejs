"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jwt_service_1 = __importDefault(require("../services/jwt.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await user_service_1.default.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (bcryptjs_1.default.compareSync(password, user.password)) {
            res.json({
                username,
                token: jwt_service_1.default.sign(user)
            });
        }
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong'
        });
    }
});
router.post('/register', async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await user_service_1.default.findByUsername(username);
        if (user) {
            return res.status(400).json({ message: 'Username already taken.' });
        }
        const data = {
            id: 0,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: client_1.Role.USER,
        };
        const newUser = await user_service_1.default.create(data);
        res.json({
            username,
            token: jwt_service_1.default.sign(newUser)
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong'
        });
    }
});
router.get('/available', async (req, res) => {
    if (!req.query.username) {
        return res.status(400).json({
            message: 'query parameter username not provided.'
        });
    }
    const username = req.query.username.toString();
    try {
        const isAvailable = await user_service_1.default.isUsernameAvailable(username);
        res.json({
            username,
            isAvailable
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong'
        });
    }
});
exports.default = router;
