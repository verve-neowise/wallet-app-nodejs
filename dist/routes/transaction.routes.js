"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const services_1 = require("../services");
const util_1 = require("../util");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    var _a, _b, _c, _d;
    const { userId } = res.locals.payload;
    const fromDate = (0, util_1.dateFromQuery)((_a = req.query.from) === null || _a === void 0 ? void 0 : _a.toString());
    const toDate = (0, util_1.dateFromQuery)((_b = req.query.to) === null || _b === void 0 ? void 0 : _b.toString());
    const category = +((_c = req.query.cat) === null || _c === void 0 ? void 0 : _c.toString());
    const type = (_d = req.query.type) === null || _d === void 0 ? void 0 : _d.toString();
    const transactions = await services_1.transactionService.findAll(userId, fromDate, toDate, category ? +category : undefined, type ? client_1.TransactionType[type] : undefined);
    res.json({
        message: 'All transactions.',
        transactions
    });
});
router.get('/:wallet_id', async (req, res) => {
    var _a, _b, _c, _d;
    const { userId } = res.locals.payload;
    const { wallet_id } = req.params;
    const ownership = await services_1.walletService.checkOwnership(userId, +wallet_id);
    const fromDate = (0, util_1.dateFromQuery)((_a = req.query.from) === null || _a === void 0 ? void 0 : _a.toString());
    const toDate = (0, util_1.dateFromQuery)((_b = req.query.to) === null || _b === void 0 ? void 0 : _b.toString());
    const category = +((_c = req.query.cat) === null || _c === void 0 ? void 0 : _c.toString());
    const type = (_d = req.query.type) === null || _d === void 0 ? void 0 : _d.toString();
    if (ownership) {
        const transactions = await services_1.transactionService.findAllByWallet(+wallet_id, fromDate, toDate, category ? +category : undefined, type ? client_1.TransactionType[type] : undefined);
        res.json({
            message: 'Wallet transactions.',
            transactions
        });
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        });
    }
});
router.post('/:wallet_id', async (req, res) => {
    const { userId } = res.locals.payload;
    const { wallet_id } = req.params;
    const { amount, comment, type, category } = req.body;
    const ownership = await services_1.walletService.checkOwnership(userId, +wallet_id);
    if (ownership) {
        const transaction = await services_1.transactionService.create(+wallet_id, amount, comment, type, category);
        res.json({
            message: 'Transaction created.',
            transaction
        });
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        });
    }
});
router.put('/:id', async (req, res) => {
    const { userId } = res.locals.payload;
    const { id } = req.params;
    const { amount, comment, type, category } = req.body;
    const ownership = await services_1.transactionService.checkOwnership(userId, +id);
    if (ownership) {
        const transaction = await services_1.transactionService.update(+id, amount, comment, type, category);
        res.json({
            message: 'Transaction updated.',
            transaction
        });
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        });
    }
});
router.delete('/:id', async (req, res) => {
    const { userId } = res.locals.payload;
    const { id } = req.params;
    const ownership = await services_1.transactionService.checkOwnership(userId, +id);
    if (ownership) {
        const transaction = await services_1.transactionService.remove(+id);
        res.json({
            message: 'Transaction deleted.',
            transaction
        });
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        });
    }
});
exports.default = router;
