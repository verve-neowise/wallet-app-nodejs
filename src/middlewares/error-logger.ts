import { NextFunction, Request, Response } from "express";

export default function (error: any, req: Request, res: Response, next: NextFunction) {
    console.error(`${req.method} '${req.baseUrl}': ${error}`);
    next()
}
