"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const categories = await services_1.categoryService.findAll();
        res.json({
            message: "Retrive all.",
            categories
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const { name, code } = req.body;
        const category = await services_1.categoryService.create(name, code);
        res.json({
            message: 'Category created.',
            category
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
        const category = await services_1.categoryService.update(id, name, code);
        res.json({
            message: 'Category updated.',
            category
        });
    }
    catch (err) {
        next(err);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        const category = await services_1.categoryService.remove(id);
        res.json({
            message: 'Category deleted.',
            category
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
