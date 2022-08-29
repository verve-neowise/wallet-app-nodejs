import { Router } from "express";
import { walletTypeService } from "../services";

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const types = await walletTypeService.findAll()
        res.json({
            message: "Retrive all.",
            types
        })
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body
        const type = await walletTypeService.create(name)

        res.json({
            message: 'Type created.',
            type
        })
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id
        const { name } = req.body

        const type = await walletTypeService.update(id, name)

        res.json({
            message: 'Type updated.',
            type
        })
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = +req.params.id

        const type = await walletTypeService.remove(id)

        res.json({
            message: 'Type deleted.',
            type
        })
    }
    catch (err) {
        next(err)
    }
})

export default router