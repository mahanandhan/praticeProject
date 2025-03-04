import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {console.log("Connected to DB...")});
    } catch (error) {
        console.log("error in mongodb connection", error);
    }
}