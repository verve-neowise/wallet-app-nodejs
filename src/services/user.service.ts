import { User } from "@prisma/client";
import bcrypt from 'bcryptjs'

import { client } from "../config";

async function create(data: User) {

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(data.password, salt)

    const user = await client.user.create({
        data: {
            username: data.username,
            password: hashedPassword,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
        }
    });
    return user;
}

async function findByUsername(username: string) {
    return client.user.findFirst({
        where: {
            username
        }
    })
}

async function isUsernameAvailable(username: string) {
    const count = await client.user.count({
        where: {
            username
        } 
    })

    return count === 0
}

export default {
    create,
    findByUsername,
    isUsernameAvailable
}