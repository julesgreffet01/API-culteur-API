import {NextFunction, Request, Response} from "express";
import type {JwtPayload} from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import {UserRepository} from "../User/UserRepository";
import {UserService} from "../User/UserService";


// ---------------- token ---------------
export function verifyTokenMiddleware (req: Request, res: Response, next: NextFunction) {
    if(!req.headers.authorization) {
        return res.status(401).json({
            status: 401,
            error: "No token provided",
        })
    }
    const token = req.headers.authorization.split(" ")[1];
    try{
        req.userId = verifyToken(token);
        console.log(req.userId);
        next()
    } catch(err){
        return res.status(401).json({
            status: 401,
            error: "Bad Token"
        })
    }
}

function base64urlDecode(str: string) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(str, "base64");
}

interface MyPayload extends JwtPayload {
    id: number;
    exp: number;
}

function verifyToken(token: string) {
    const jwkK = "kWpZXidz3sVVx2Jn1J-5ANXnA2IKwfIAY2CoBW1q7I0";
    const secret = base64urlDecode(jwkK);
    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded === "string") {
            throw new Error("Invalid token payload");
        }

        if (!("id" in decoded)) {
            throw new Error("Missing id");
        }
        if((decoded as MyPayload).exp  >= new Date().getTime()) {
            throw new Error("Invalid token payload");
        }
        return (decoded as MyPayload).id;
    } catch (err) {
        console.error(err);
        throw new Error("Token invalid.");
    }
}

// ----------------- verifyRole ----------------
export async function verifyAdminMiddleware (req: Request, res: Response, next: NextFunction) {
    const userService = new UserService();
    if(!req.userId) {
        return res.status(401).json({
            status: 401,
            error: "token invalid (role)",
        })
    }
    const role = await userService.getRole(req.userId)
    if(role !== "admin") return res.status(401).json({
        status: 401,
        error: "Invalid role",
    })
    next()
}

export async function verifyDevopsMiddleware (req: Request, res: Response, next: NextFunction) {
    const userService = new UserService();
    if(!req.userId) {
        return res.status(401).json({
            status: 401,
            error: "token invalid (role)",
        })
    }
    const role = await userService.getRole(req.userId)
    if(role !== "admin" && role !== "dev_ops") return res.status(401).json({
        status: 401,
        error: "Invalid role",
    })
    next()
}