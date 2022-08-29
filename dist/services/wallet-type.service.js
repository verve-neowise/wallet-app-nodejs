"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findAll = void 0;
const config_1 = require("../config");
function findAll() {
    return config_1.client.walletType.findMany();
}
exports.findAll = findAll;
function create(name) {
    return config_1.client.walletType.create({
        data: {
            name
        }
    });
}
exports.create = create;
function update(id, name) {
    return config_1.client.walletType.update({
        where: {
            id
        },
        data: {
            name,
        }
    });
}
exports.update = update;
function remove(id) {
    return config_1.client.walletType.delete({
        where: {
            id
        }
    });
}
exports.remove = remove;
exports.default = {
    findAll,
    create,
    remove,
    update
};
