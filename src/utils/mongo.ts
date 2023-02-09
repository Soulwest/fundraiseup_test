import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl =`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;