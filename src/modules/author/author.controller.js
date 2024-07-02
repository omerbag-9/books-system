import { query } from "express"
import { Author } from "../../../db/models/author.model.js"

// add author
export const addAuthor = async (req, res, next) => {

    try {
        const { name, bio, birthdate, books } = req.body
        const author = new Author({
            name,
            bio,
            birthdate,
            books
        })
        const createdAuthor = await author.save()
        return res.status(201).json({ message: 'author added successfully', success: true, data: createdAuthor })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// get all authors with pagination each page contains 2 authors and get the data of the book using populate and can filter by name or bio
export const getAllAuthors = async (req, res, next) => {
    const { page, limit = 2,filter } = req.query;
    try {
        let query = {};

        if (filter) {
            query.$or = [
                { name: { $regex: filter, $options: 'i' } },
                { bio: { $regex: filter, $options: 'i' } }
            ];
        }
        const allAuthors = await Author.find(query).populate('books').limit(limit * 1)
        .skip((page - 1)*limit)
        .exec();
        return res.status(200).json({ data: allAuthors, success: true })

    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// get Author by id

export const getAuthorById = async (req, res, next) => {
    try {
        const { id } = req.params
        const isExist = await Author.findById({ _id: id }).populate('books')
        if (!isExist) {
            throw new Error("author is not found", { cause: 404 })
        }
        return res.status(200).json({ data: isExist ,success:true})
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// update author

export const updateAuthor = async (req, res, next) => {
    try {
        const {bio,books} = req.body
        const { id } = req.params
        const isExist = await Author.findById({ _id: id })
        if (!isExist) {
            throw new Error("author is not found", { cause: 404 })
        }
        const updatedAuthor = await Author.updateOne({ _id: id },{bio,books},{new:true})
        return res.status(200).json({ message: "author updated successfully" ,success:true,data:updatedAuthor})
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// delete author

export const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const isExist = await Author.findById({ _id: id })
        if (!isExist) {
            throw new Error("author is not found", { cause: 404 })
        }
        const deletedAuthor = await Author.deleteOne({ _id: id })
        return res.status(200).json({ message: "Author deleted successfully" ,success:true,data:deletedAuthor})
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}
