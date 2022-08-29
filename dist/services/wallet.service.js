"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function create(userId, name, type, currency) {
    return config_1.client.wallet.create({
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
    });
}
async function findAll(userId) {
    return config_1.client.wallet.findMany({
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
    });
}
async function changeStatus(id, status) {
    return config_1.client.wallet.update({
        where: {
            id
        },
        data: {
            status
        }
    });
}
async function changePayment(id, oldAmount, newAmount) {
    return config_1.client.wallet.update({
        where: {
            id
        },
        data: {
            balance: {
                decrement: oldAmount,
                increment: newAmount
            }
        }
    });
}
async function addPayment(id, amount) {
    return config_1.client.wallet.update({
        where: {
            id
        },
        data: {
            balance: {
                increment: amount
            }
        }
    });
}
async function removePayment(id, amount) {
    config_1.client.wallet.update({
        where: {
            id
        },
        data: {
            balance: {
                decrement: amount
            }
        }
    });
}
async function update(id, name, type, currency) {
    return config_1.client.wallet.update({
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
exports.default = {
    create,
    findAll,
    addPayment,
    removePayment,
    changePayment,
    checkOwnership,
    remove,
    update
};
