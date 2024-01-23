import mongoose from "mongoose";

const connectDB = async()=>{

    return await mongoose.connect(process.env.DB_LOCAL).
    then(()=>{
        console.log("Connect DB...");
    }).catch((err)=>{
        console.log(`Error connecting to DB: ${err}`);
    })
}

export default connectDB

