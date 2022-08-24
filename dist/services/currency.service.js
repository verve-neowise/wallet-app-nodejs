"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findAll = void 0;
const config_1 = require("../config");
function findAll() {
    return config_1.client.currency.findMany();
}
exports.findAll = findAll;
function create(name, code) {
    return config_1.client.currency.create({
        data: {
            name,
            code
        }
    });
}
exports.create = create;
function update(id, name, code) {
    return config_1.client.currency.update({
        where: {
            id
        },
        data: {
            name,
            code
        }
    });
}
exports.update = update;
function remove(id) {
    return config_1.client.currency.delete({
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
