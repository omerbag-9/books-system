import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from "./book.controller.js";

const bookRouter = Router()

bookRouter.post('/',addBook)
bookRouter.get('/',getAllBooks)
bookRouter.get('/:id',getBookById)
bookRouter.patch('/:id',updateBook)
bookRouter.delete('/:id',deleteBook)

export {bookRouter}