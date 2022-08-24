import { client } from "../config";

export function findAll() {
    return client.currency.findMany()
}

export function create(name: string, code) {
    return client.currency.create({
        data: {
            name,
            code
        }
    })
}

export function update(id: number, name: string, code: string) {
    return client.currency.update({
        where: {
            id
        },
        data: {
            name,
            code
        }
    })
}

export function remove(id: number) {
    return client.currency.delete({
        where: {
            id
        }
    })
}

export default {
    findAll,
    create,
    remove,
    update
}