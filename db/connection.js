import mongoose from "mongoose";

export const  connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/books').then(()=>{
        console.log('db connected successfully');
    }).catch((err)=>{
        console.log(err);
    })
}