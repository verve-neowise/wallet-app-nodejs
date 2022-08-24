import { Wallet } from "@prisma/client"
import { client } from "../config"
import { WalletDetail } from "../model"

async function create(userId: number, name: string, categoryId: number, currencyId: number) {
    return client.wallet.create({
        data: {
            name,
            user: { 
                connect: { id: userId } 
            },
            category: {
                connect: { id: categoryId }
            },
            currency: {
                connect: { id: currencyId }
            }
        },
        include: {
            category: true,
            currency: true
        }
    })
}

async function findAll(userId: number) {
    return client.wallet.findMany({
        where: {
            userId
        },
        include: {
            category: true,
            currency: true
        }
    })
}

async function update(id: number, name: string, categoryId: number, currencyId: number) {
    return client.wallet.update({
        where: {
            id
        },
        data: {
            name,
            category: {
                connect: { id: categoryId }
            },
            currency: {
                connect: { id: currencyId }
            }
        },
        include: {
            category: true,
            currency: true
        }
    })
}

async function remove(id: number) {
    return client.wallet.delete({
        where: {
            id
        }
    })
}

async function checkOwnership(userId: number, walletId: number) {

    const wallet = await client.wallet.findFirst({
        where: {
            id: walletId,
            userId: userId
        }
    })

    return wallet != null
}

async function details(id: number): Promise<WalletDetail> {

    const wallet = await client.wallet.findUnique({
        where: {
            id
        },
        include: {
            category: true,
            currency: true,
            transactions: true
        }
    })

    let balance = 0

    for (const transaction of wallet.transactions) {

        if (transaction.type == "INCOMING") {
            balance += transaction.amount
        }
        else {
            balance -= transaction.amount
        }
    }

    return {
        id: wallet.id,
        name: wallet.name,
        status: wallet.status,
        category: wallet.category,
        currency: wallet.currency,
        transactions: wallet.transactions,
        balance,
        updatedAt: wallet.updatedAt,
        createdAt: wallet.createdAt
    }
}

export default {
    create,
    findAll,
    checkOwnership,
    details,
    remove,
    update
}