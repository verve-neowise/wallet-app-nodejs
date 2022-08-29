import { client } from "../config";


export function findAll() {
    return client.walletType.findMany()
}

export function create(name: string) {
    return client.walletType.create({
        data: {
            name
        }
    })
}

export function update(id: number, name: string) {
    return client.walletType.update({
        where: {
            id
        },
        data: {
            name,
        }
    })
}

export function remove(id: number) {
    return client.walletType.delete({
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