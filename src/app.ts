import express, { Request, Response } from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import bookRouter from "./routes/book.routes";
import borrowRouter from "./routes/borrow.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Importing routes
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrows", borrowRouter);

// Error handling middleware
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Minimal Library Management System Server!");
});

export default app;
