import { Router } from "express";
import { createBorrow, getAllBorrows } from "../controllers/borrow.controller";

const borrowRouter = Router();

// *Importing borrow controller
borrowRouter.get("/", getAllBorrows);
borrowRouter.post("/", createBorrow);

export default borrowRouter;
