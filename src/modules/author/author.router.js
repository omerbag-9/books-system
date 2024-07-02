import { Router } from "express";
import { addAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "./author.controller.js";

const authorRouter = Router()

authorRouter.post('/',addAuthor)
authorRouter.get('/',getAllAuthors)
authorRouter.get('/:id',getAuthorById)
authorRouter.patch('/:id',updateAuthor)
authorRouter.delete('/:id',deleteAuthor)

export {authorRouter}