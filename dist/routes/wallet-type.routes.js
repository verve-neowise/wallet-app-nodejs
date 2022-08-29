"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const types = await services_1.walletTypeService.findAll();
        res.json({
            message: "Retrive all.",
            types
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;
        const type = await services_1.walletTypeService.create(name);
        res.json({
            message: 'Type created.',
            type
        });
    }
    catch (err) {
        next(err);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const { name } = req.body;
        const type = await services_1.walletTypeService.update(id, name);
        res.json({
            message: 'Type updated.',
            type
        });
    }
    catch (err) {
        next(err);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const type = await services_1.walletTypeService.remove(id);
        res.json({
            message: 'Type deleted.',
            type
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
