import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Authorization header is missing");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send("Token is missing");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number, role: string };
        // @ts-ignore
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send("Invalid token");
    }   
};

