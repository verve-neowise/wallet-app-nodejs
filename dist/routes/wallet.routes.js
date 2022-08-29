"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        console.log('prepare response');
        const { userId } = res.locals.payload;
        const wallets = await services_1.walletService.findAll(userId);
        console.log('Send response');
        res.json({
            message: 'All wallets',
            wallets
        });
    }
    catch (err) {
        console.log('next t error');
        next(err);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload;
        const { name, type, currency } = req.body;
        const wallet = await services_1.walletService.create(userId, name, type, currency);
        res.json({
            message: 'Wallet created.',
            wallet
        });
    }
    catch (err) {
        next(err);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload;
        const { name, type, currency } = req.body;
        const ownership = await services_1.walletService.checkOwnership(userId, +req.params.id);
        if (ownership) {
            const wallet = await services_1.walletService.update(userId, name, type, currency);
            res.json({
                message: 'Wallet created.',
                wallet
            });
        }
        else {
            res.status(403).json({
                message: 'Wallet does not exists or you don`t have access to this wallet.',
            });
        }
    }
    catch (err) {
        next(err);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload;
        const ownership = await services_1.walletService.checkOwnership(userId, +req.params.id);
        if (ownership) {
            const wallet = await services_1.walletService.remove(+req.params.id);
            res.json({
                message: 'Wallet deleted.',
                wallet
            });
        }
        else {
            res.status(403).json({
                message: 'Wallet does not exists or you don`t have access to this wallet.',
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
