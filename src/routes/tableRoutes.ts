import { Router } from "express";
import { tableController } from "../controllers/tableControllers";

const tableRoutes = Router();

tableRoutes.post("/",tableController.createtable); 
tableRoutes.get("/", tableController.getTables);
tableRoutes.get("/:id", tableController.getTableById);
tableRoutes.put("/:id", tableController.updateTable);

export default tableRoutes;