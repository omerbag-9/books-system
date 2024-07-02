import { Schema, model } from "mongoose";

// schema
 const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        ref:'Author',
        required:true
    },
    publishedDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
// model
export const Book = model('Book',bookSchema)