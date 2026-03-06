import { Router } from "express";
import { authController } from "../controllers/authControllers";



const authRoutes = Router();

authRoutes.post("/register",authController.register); 
authRoutes.post("/login", authController.login);
authRoutes.get("/me", authController.getMe);

export default authRoutes;