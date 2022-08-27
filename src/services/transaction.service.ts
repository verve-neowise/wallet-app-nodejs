import { TransactionType } from '@prisma/client'
import { client } from "../config"

async function create(walletId: number, amount: number, comment: string, type: TransactionType, category: number) {
    return client.transaction.create({
        data: {
            wallet: {
                connect: { id: walletId }
            },
            category: {
                connect: { id: category }
            },
            amount,
            comment,
            type
        }
    })
}

async function update(id: number, amount: number, comment: string, type: TransactionType, category: number) {
    return client.transaction.update({
        where: {
            id
        },
        data: {
            category: {
                connect: { id: category }
            },
            amount,
            comment,
            type
        }
    })   
}

async function remove(id: number) {
    return client.transaction.delete({
        where: {
            id
        }
    })
}

async function findAll(
    walletId: number,
    fromDate: Date, toDate: Date,
    category?: number,
    type?: TransactionType
    ) {
    return client.transaction.findMany({
        where: {
            walletId,
            createdAt: {
                lte: toDate,
                gte: fromDate
            },
            categoryId: category,
            type
        },
        include: {
            category: true
        }
    })
}

export default {
    create,
    update,
    remove,
    findAll
}