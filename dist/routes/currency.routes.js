"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const currencies = await services_1.currencyService.findAll();
        res.json({
            message: "Retrive all.",
            currencies
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const { name, code } = req.body;
        const currency = await services_1.currencyService.create(name, code);
        res.json({
            message: 'Currency created.',
            currency
        });
    }
    catch (err) {
        next(err);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const { name, code } = req.body;
        const currency = await services_1.currencyService.update(id, name, code);
        res.json({
            message: 'Currency updated.',
            currency
        });
    }
    catch (err) {
        next(err);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const currency = await services_1.currencyService.remove(id);
        res.json({
            message: 'Currency deleted.',
            currency
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
