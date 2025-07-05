/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

// *Get all books with optional filters and sorting
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // *Extract query parameters for filtering and sorting
  const filter = req.query.filter;
  const sortBy = req.query.sortBy;
  const sort = req.query.sort;
  const limit = req.query.limit || 100;

  const query: any = {};

  if (filter) {
    query.genre = { $regex: filter, $options: "i" };
  }
  try {
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));

    if (books) {
      res.status(200).send({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

// *Create a book
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const bookData = await new Book(payload).save();
    if (bookData) {
      res.status(201).send({
        success: true,
        message: "Book created successfully",
        data: bookData,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

// *Get a book by ID
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    res.status(400).send({
      success: false,
      message: "Book ID is required",
    });
  }

  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.status(200).send({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
};

// *Update a book by ID
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    res.status(400).send({
      success: false,
      message: "Book ID is required",
    });
  }

  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { ...req.body, available: req.body.copies > 0 },
      {
        new: true,
      }
    );
    if (book) {
      res.status(200).send({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
};

// *Delete a book by ID
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    res.status(400).send({
      success: false,
      message: "Book ID is required",
    });
  }
  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (book) {
      res.status(200).send({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
};
