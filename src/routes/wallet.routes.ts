import { Router } from "express";
import { walletService } from "../services";

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload
        const wallets = await walletService.findAll(userId)

        res.json({
            message: 'All wallets',
            wallets
        })
    }
    catch (err) {
        next(err)
    }
})

<<<<<<< HEAD

=======
>>>>>>> 9378f385aa44426fa382ab310092b124a93e7552
router.post('/', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload
        const { name, type, currency } = req.body

<<<<<<< HEAD
        const wallet = await walletService.create(userId, name, currency, type)
=======
        const wallet = await walletService.create(userId, name, type, currency)
>>>>>>> 9378f385aa44426fa382ab310092b124a93e7552

        res.json({
            message: 'Wallet created.',
            wallet
        })
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload
        const { name, type, currency } = req.body

        const ownership = await walletService.checkOwnership(userId, +req.params.id)

        if (ownership) {
<<<<<<< HEAD
            const wallet = await walletService.update(userId, name, currency, type)
=======
            const wallet = await walletService.update(userId, name, type, currency)
>>>>>>> 9378f385aa44426fa382ab310092b124a93e7552
            res.json({
                message: 'Wallet created.',
                wallet
            })
        }
        else {
            res.status(403).json({
                message: 'Wallet does not exists or you don`t have access to this wallet.',
            })
        }
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload

        const ownership = await walletService.checkOwnership(userId, +req.params.id)

        if (ownership) {
            const wallet = await walletService.remove(+req.params.id)
            res.json({
                message: 'Wallet deleted.',
                wallet
            })
        }
        else {
            res.status(403).json({
                message: 'Wallet does not exists or you don`t have access to this wallet.',
            })
        }
    }
    catch (err) {
        next(err)
    }
})

export default router