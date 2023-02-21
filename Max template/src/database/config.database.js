import mongoose from "mongoose";
import dotenv from "dotenv";
import seedTables from "./mock.database.js";

const PORT = process.env.PORT || 2023;

const connectDB = async (app) => {
   try {
    await mongoose.set('strictQuery', false);

    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

       app.listen( PORT, () => console.log( `Server Port: ${PORT}` ) )
       
       /* insert data only if tables are empty */
       seedTables();
   } catch (e) {
        console.error(`${e} did not connect`)    
   }
}

export default connectDB;
