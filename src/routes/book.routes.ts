import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller";

const bookRouter = Router();

// *Importing book controller
bookRouter.get("/", getAllBooks);
bookRouter.post("/", createBook);
bookRouter.get("/:bookId", getBookById);
bookRouter.put("/:bookId", updateBook);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
