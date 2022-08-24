import { client } from "../config";


export function findAll() {
    return client.category.findMany()
}

export function create(name: string, code: string) {
    return client.category.create({
        data: {
            name,
            code
        }
    })
}

export function update(id: number, name: string, code: string) {
    return client.category.update({
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
    return client.category.delete({
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