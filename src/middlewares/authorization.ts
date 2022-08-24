import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwt.service";
import { error, info } from "../util";

export default (requiredRoles?: Role[]) => {

    return (req: Request, res: Response, next: NextFunction) => {

        let token = req.header('Authorization')
        
        if (!token) {
            error(`token not provided`);
            return res.status(401).send({ message: 'Token not provided' })
        }

        error(`provided token ${token}`);

        let payload = jwtService.validate(token)

        if (payload == null) {
            error(`token not provided`);
            return res.status(401).send({ message: 'Token is not valid.' })
        }

        info(`token is valid`);

        if ( requiredRoles && !requiredRoles.includes(payload.role)) {
            error(`user role does not match required role: user=${payload.role}, required=${requiredRoles}`);
            return res.status(401).send({ message: 'Access denied.' })
        }

        if (requiredRoles) {
            info('user role matches required role');
        }
        else {
            info('user authorized without role');
        }
        
        info('store payload for next middleware');
        res.locals.payload = payload

        next()
    }
} 