import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authController = {
    register: async (req: Request, res: Response) => {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.phoneNumber) {
          return res.status(400).send("Email, password, name, and phone number are required");
        }
          try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (existingUser) {
            return res.status(400).send("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

       const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name,
                role: "USER",
                phone: req.body.phoneNumber,
            },})

        res.status(201).send({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    },

    login: async (req: Request, res: Response) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send("Email and password are required");
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: req.body.email,
                },
            });

            if (!user) {
                return res.status(400).send("Invalid email or password");
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send("Invalid email or password");
            }

        
             const token = jwt.sign({ id: user.id , role: user.role}, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            res.status(200).send({
                success: true,
                message: "Login successful",
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    },
    getMe: async (req: Request, res: Response) => {
        res.status(200).send({
            success: true,
            // @ts-ignore
            user: req.user
        });
    }

};