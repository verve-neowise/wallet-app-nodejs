import { Router } from "express";
import { walletService } from "../services";

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        console.log('prepare response');
        const { userId } = res.locals.payload
        const wallets = await walletService.findAll(userId)

        console.log('Send response');
        res.json({
            message: 'All wallets',
            wallets
        })
    }
    catch (err) {
        console.log('next t error');
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { userId } = res.locals.payload
        const { name, type, currency } = req.body
        
        const wallet = await walletService.create(userId, name, type, currency)

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
            const wallet = await walletService.update(userId, name, type, currency)
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