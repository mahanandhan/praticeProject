import express from "express";
import {addProduct, productById, productList, removeProduct} from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({storage: storage});

productRouter.post("/add",upload.single("image"), addProduct);
productRouter.get("/list", productList);
productRouter.post("/remove", removeProduct);
productRouter.get("/product/:id", productById);
export default productRouter;