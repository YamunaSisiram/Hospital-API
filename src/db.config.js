import mongoose from "mongoose";

export const connectToDb = async()=> {
    try{
        await mongoose.connect('mongodb://localhost:27017/hospital');
        console.log('connected to db');
    }catch(err){
        console.log('error connecting to DB');
    }
}