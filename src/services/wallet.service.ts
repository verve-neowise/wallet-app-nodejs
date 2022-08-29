import { WalletStatus } from "@prisma/client"
import { client } from "../config"


async function create(userId: number, name: string, type: number, currency: number) {
    return client.wallet.create({
        data: {
            name,
            user: { 
                connect: { id: userId } 
            },
            type: {
                connect: { id: type }
            },
            currency: {
                connect: { id: currency }
            },
        },
        include: {
            type: true,
            currency: {
                select: {
                    name: true,
                    code: true,
                    id: true,
                    createdAt: false,
                    updatedAt: false
                }
            }
        }
    })
}

async function findAll(userId: number) {
    return client.wallet.findMany({
        where: {
            userId
        },
        include: {
            type: true,
            currency: {
                select: {
                    name: true,
                    code: true,
                    id: true,
                    createdAt: false,
                    updatedAt: false
                }
            }
        }
    })
}


async function changeStatus(id: number, status: WalletStatus) {
    return client.wallet.update({
        where: {
            id
        },
        data: {
            status
        }
    })
}

async function changePayment(id: number, oldAmount: number, newAmount: number) {
    return client.wallet.update({
        where: {
            id
        },
        data: {
            balance: {
                decrement: oldAmount,
                increment: newAmount
            }
        }
    })

}

async function addPayment(id: number, amount: number) {
    return client.wallet.update({
        where: {
            id
        },
        data: {
            balance: {
                increment: amount
            }
        }
    })
}

async function removePayment(id: number, amount: number) {
    client.wallet.update({
        where: {
            id
        },
        data: {
            balance: {
                decrement: amount
            }
        }
    })
}

async function update(id: number, name: string, type: number, currency: number) {
    return client.wallet.update({
        where: {
            id
        },
        data: {
            name,
            type: {
                connect: { id: type }
            },
            currency: {
                connect: { id: currency }
            }
        },
        include: {
            currency: {
                select: {
                    name: true,
                    code: true,
                    id: true,
                    createdAt: false,
                    updatedAt: false
                }
            }
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

export default {
    create,
    findAll,
    addPayment,
    removePayment,
    changePayment,
    checkOwnership,
    remove,
    update
}