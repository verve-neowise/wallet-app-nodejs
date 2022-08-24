import { Router } from "express";
import { categoryService } from "../services";

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const categories = await categoryService.findAll()
        res.json({
            message: "Retrive all.",
            categories
        })
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, code } = req.body
        const category = await categoryService.create(name, code)

        res.json({
            message: 'Category created.',
            category
        })
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id
        const { name, code } = req.body

        const category = await categoryService.update(id, name, code)

        res.json({
            message: 'Category updated.',
            category
        })
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id

        const category = await categoryService.remove(id)

        res.json({
            message: 'Category deleted.',
            category
        })
    }
    catch (err) {
        next(err)
    }
})

export default router