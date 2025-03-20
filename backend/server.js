import express from "express";
import cors from "cors";
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
const app = express();
const port = 4002;
//dbconnection
connectDB();
//middleware
app.use(express.json());
app.use(cors());
//routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/images', express.static('uploads'));
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('The server is connected successfully');
})
app.listen(port, () => {
    console.log(`Server is running on 4000`);
})