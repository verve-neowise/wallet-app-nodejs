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
            }
        },
        include: {
            type: true,
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
            type: true,
            currency: true
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

export default {
    create,
    findAll,
    checkOwnership,
    remove,
    update
}