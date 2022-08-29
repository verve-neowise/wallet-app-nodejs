import { TransactionType } from "@prisma/client";
import { Router } from "express";
import { walletService, transactionService } from "../services";
import { dateFromQuery } from "../util";

const router = Router()

router.get('/:wallet_id', async (req, res) => {

    const { userId } = res.locals.payload
    const { wallet_id } = req.params

    const ownership = await walletService.checkOwnership(userId, +wallet_id)

    const fromDate = dateFromQuery(req.query.from?.toString())
    const toDate = dateFromQuery(req.query.to?.toString())
    const category = +req.query.cat?.toString()
    const type = req.query.cat?.toString()

    if (ownership) {
        const transactions = await transactionService.findAll(
            +wallet_id, 
            fromDate, 
            toDate,
            category ? +category : null,
            type ? TransactionType[type] : null
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

export default router