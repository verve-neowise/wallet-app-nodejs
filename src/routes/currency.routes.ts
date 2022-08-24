import { Router } from "express";
import { currencyService } from "../services";

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const currencies = await currencyService.findAll()
        res.json({
            message: "Retrive all.",
            currencies
        })
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, code } = req.body
        const currency = await currencyService.create(name, code)

        res.json({
            message: 'Currency created.',
            currency
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

        const currency = await currencyService.update(id, name, code)

        res.json({
            message: 'Currency updated.',
            currency
        })
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id

        const currency = await currencyService.remove(id)

        res.json({
            message: 'Currency deleted.',
            currency
        })
    }
    catch (err) {
        next(err)
    }
})

export default router