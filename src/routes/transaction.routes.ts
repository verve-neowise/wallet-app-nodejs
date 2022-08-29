import { TransactionType } from "@prisma/client";
import { Router } from "express";
import { walletService, transactionService } from "../services";
import { dateFromQuery } from "../util";

const router = Router()

router.get('/', async (req, res) => {

    const { userId } = res.locals.payload

    const fromDate = dateFromQuery(req.query.from?.toString())
    const toDate = dateFromQuery(req.query.to?.toString())
    const category = +req.query.cat?.toString()
    const type = req.query.type?.toString()

    const transactions = await transactionService.findAll(
        userId,
        fromDate,
        toDate,
        category ? +category : undefined,
        type ? TransactionType[type] : undefined
    )

    res.json({
        message: 'All transactions.',
        transactions
    })

})

router.get('/:wallet_id', async (req, res) => {

    const { userId } = res.locals.payload
    const { wallet_id } = req.params

    const ownership = await walletService.checkOwnership(userId, +wallet_id)

    const fromDate = dateFromQuery(req.query.from?.toString())
    const toDate = dateFromQuery(req.query.to?.toString())
    const category = +req.query.cat?.toString()
    const type = req.query.type?.toString()

    if (ownership) {
        const transactions = await transactionService.findAllByWallet(
            +wallet_id,
            fromDate,
            toDate,
            category ? +category : undefined,
            type ? TransactionType[type] : undefined
        )

        res.json({
            message: 'Wallet transactions.',
            transactions
        })
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        })
    }
})

router.post('/:wallet_id', async (req, res) => {

    const { userId } = res.locals.payload
    const { wallet_id } = req.params

    const { amount, comment, type, category } = req.body

    const ownership = await walletService.checkOwnership(userId, +wallet_id)

    if (ownership) {

        const transaction = await transactionService.create(+wallet_id, amount, comment, type, category)

        res.json({
            message: 'Transaction created.',
            transaction
        })
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        })
    }
})


router.put('/:id', async (req, res) => {

    const { userId } = res.locals.payload
    const { id } = req.params

    const { amount, comment, type, category } = req.body

    const ownership = await transactionService.checkOwnership(userId, +id)

    if (ownership) {

        const transaction = await transactionService.update(+id, amount, comment, type, category)

        res.json({
            message: 'Transaction updated.',
            transaction
        })
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        })
    }
})

router.delete('/:id', async (req, res) => {

    const { userId } = res.locals.payload
    const { id } = req.params

    const ownership = await transactionService.checkOwnership(userId, +id)

    if (ownership) {

        const transaction = await transactionService.remove(+id)

        res.json({
            message: 'Transaction deleted.',
            transaction
        })
    }
    else {
        res.status(403).json({
            message: 'Wallet does not exists or you don`t have access to this wallet.',
        })
    }
})

export default router