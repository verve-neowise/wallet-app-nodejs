import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import Payload from '../model/payload';

function sign(user: User): string {
    
    let payload: Payload = {
        userId: user.id,
        username: user.username,
        role: user.role
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function validate(token: string): Payload {
    try {
        return jwt.verify(token, process.env.JWT_SECRET) as Payload;
    } 
    catch(err) {
        return null
    }
}

export default {
    sign,
    validate
}