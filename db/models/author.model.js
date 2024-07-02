import { Schema, model } from "mongoose";

// schema
const authorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    bio:String,
    birthDate:Date,
    books:[{
        type:Schema.Types.ObjectId,
        ref:'Book'
    }]
},{timestamps:true})

export const Author = model('Author',authorSchema)