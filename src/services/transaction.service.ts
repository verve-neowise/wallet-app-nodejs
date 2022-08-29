import { TransactionType } from '@prisma/client'
import { client } from "../config"
import walletService from './wallet.service'

async function create(walletId: number, amount: number, comment: string, type: TransactionType, category: number) {
    
    const transaction = await client.transaction.create({
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
    let sign = type == TransactionType.EXPOSE ? -1 : 1

    await walletService.addPayment(walletId, sign * transaction.amount)

    return transaction
}

async function update(id: number, amount: number, comment: string, type: TransactionType, category: number) {

    const oldTransaction = await client.transaction.findUnique({
        where: {
            id
        }
    })

    const transaction = await client.transaction.update({
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
    
    let oldSign = oldTransaction.type == TransactionType.EXPOSE ? -1 : 1
    let newSign = transaction.type == TransactionType.EXPOSE ? -1 : 1

    await walletService.changePayment(id, oldSign * oldTransaction.amount, newSign * transaction.amount)

    return transaction
}

async function remove(id: number) {
    const transaction = await client.transaction.delete({
        where: {
            id
        }
    })
    
    let sign = transaction.type == TransactionType.EXPOSE ? -1 : 1

    await walletService.removePayment(id, sign * transaction.amount)

    return transaction
}

async function findAll(
    userId: number, 
    fromDate?: Date, 
    toDate?: Date,
    category?: number,
    type?: TransactionType
    ) {

        return client.transaction.findMany({
            where: {
                wallet: {
                    userId
                },
                createdAt: {
                    lte: toDate,
                    gte: fromDate
                },
                categoryId: category,
                type
            },
            select: {
                id: true,
                amount: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        code: true
                    }
                },
                comment: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                categoryId: false,
                walletId: false,
                wallet: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
}

async function findAllByWallet(
    walletId: number,
    fromDate?: Date, 
    toDate?: Date,
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

async function checkOwnership(userId: number, transactionId: number) {
    const count = await client.transaction.count({
        where: {
            id: transactionId,
            wallet: {
                userId
            }
        }
    })

    return count != 0
}

export default {
    create,
    update,
    remove,
    findAllByWallet,
    findAll,
    checkOwnership
}