"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function create(userId, name, categoryId, currencyId) {
    return config_1.client.wallet.create({
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
    });
}
async function findAll(userId) {
    return config_1.client.wallet.findMany({
        where: {
            userId
        },
        include: {
            category: true,
            currency: true
        }
    });
}
async function update(id, name, categoryId, currencyId) {
    return config_1.client.wallet.update({
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
    });
}
async function remove(id) {
    return config_1.client.wallet.delete({
        where: {
            id
        }
    });
}
async function checkOwnership(userId, walletId) {
    const wallet = await config_1.client.wallet.findFirst({
        where: {
            id: walletId,
            userId: userId
        }
    });
    return wallet != null;
}
async function details(id) {
    const wallet = await config_1.client.wallet.findUnique({
        where: {
            id
        },
        include: {
            category: true,
            currency: true,
            transactions: true
        }
    });
    let balance = 0;
    for (const transaction of wallet.transactions) {
        if (transaction.type == "INCOMING") {
            balance += transaction.amount;
        }
        else {
            balance -= transaction.amount;
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
    };
}
exports.default = {
    create,
    findAll,
    checkOwnership,
    details,
    remove,
    update
};
