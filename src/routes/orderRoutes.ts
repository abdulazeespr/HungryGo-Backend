import { Router } from "express";
import { orderController } from "../controllers/orderControllers";



const orderRoutes = Router();

orderRoutes.post("/",orderController.createOrder); 
orderRoutes.get("/", orderController.getOrders);
orderRoutes.get("/:id", orderController.getOrderById);

export default orderRoutes;