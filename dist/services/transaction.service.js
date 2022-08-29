"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const config_1 = require("../config");
const wallet_service_1 = __importDefault(require("./wallet.service"));
async function create(walletId, amount, comment, type, category) {
    const transaction = await config_1.client.transaction.create({
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
    });
    let sign = type == client_1.TransactionType.EXPOSE ? -1 : 1;
    await wallet_service_1.default.addPayment(walletId, sign * transaction.amount);
    return transaction;
}
async function update(id, amount, comment, type, category) {
    const oldTransaction = await config_1.client.transaction.findUnique({
        where: {
            id
        }
    });
    const transaction = await config_1.client.transaction.update({
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
    });
    let oldSign = oldTransaction.type == client_1.TransactionType.EXPOSE ? -1 : 1;
    let newSign = transaction.type == client_1.TransactionType.EXPOSE ? -1 : 1;
    await wallet_service_1.default.changePayment(id, oldSign * oldTransaction.amount, newSign * transaction.amount);
    return transaction;
}
async function remove(id) {
    const transaction = await config_1.client.transaction.delete({
        where: {
            id
        }
    });
    let sign = transaction.type == client_1.TransactionType.EXPOSE ? -1 : 1;
    await wallet_service_1.default.removePayment(id, sign * transaction.amount);
    return transaction;
}
async function findAll(userId, fromDate, toDate, category, type) {
    return config_1.client.transaction.findMany({
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
    });
}
async function findAllByWallet(walletId, fromDate, toDate, category, type) {
    return config_1.client.transaction.findMany({
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
    });
}
async function checkOwnership(userId, transactionId) {
    const count = await config_1.client.transaction.count({
        where: {
            id: transactionId,
            wallet: {
                userId
            }
        }
    });
    return count != 0;
}
exports.default = {
    create,
    update,
    remove,
    findAllByWallet,
    findAll,
    checkOwnership
};
