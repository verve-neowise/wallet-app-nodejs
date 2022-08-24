import { NextFunction, Request, Response } from "express";

export default function (error: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({
        message: "Internal Server Error",
        error: error
    })
}