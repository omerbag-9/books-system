import { Book } from "../../../db/models/book.model.js"

// add book
export const addBook = async (req, res, next) => {

    try {
        const { title, content, author } = req.body
        const book = new Book({
            title,
            content,
            author,
        })
        const createdBook = await book.save()
        return res.status(201).json({ message: 'book added successfully', success: true, data: createdBook })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// get all books with pagination each page displays two books and filter by title or author
export const getAllBooks = async (req, res, next) => {
    const { page, limit = 2,filter } = req.query;
    try {
        let query = {};

        if (filter) {
            query.$or = [
                { title: { $regex: filter, $options: 'i' } },
                { author: { $regex: filter, $options: 'i' } }
            ];
        }

        const allBooks = await Book.find(query).limit(limit * 1)
        .skip((page - 1)*limit)
        .exec();
        return res.status(200).json({ data: allBooks, success: true })

    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// get book by id

export const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params
        const isExist = await Book.findById({ _id: id })
        if (!isExist) {
            throw new Error("book is not found", { cause: 404 })
        }
        return res.status(200).json({ data: isExist ,success:true})
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// update book

export const updateBook = async (req, res, next) => {
    try {
        const {title,content} = req.body
        const { id } = req.params
        const isExist = await Book.findById({ _id: id })
        if (!isExist) {
            throw new Error("book is not found", { cause: 404 })
        }
        const updatedBook = await Book.updateOne({ _id: id },{title,content},{new:true})
        return res.status(200).json({ message: "book updated successfully" ,success:true,data:updatedBook})
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// delete book

export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const isExist = await Book.findById({ _id: id })
        if (!isExist) {
            throw new Error("book is not found", { cause: 404 })
        }
        const deletedBook = await Book.deleteOne({ _id: id })
        return res.status(200).json({ message: "book deleted successfully" ,success:true,data:deletedBook})
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

