import productModel from "../models/productModel.js";
import fs from "fs";

const addProduct = async (req, res) => {
    const image_filename = `${req.file.filename}`;
    console.log(image_filename);
    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })
    try {
        await product.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add product" });
    }
}

const productList = async (req, res) => {
    try {
       const products = await productModel.find({});
       res.json({success: true, data: products}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
}
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => {});
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to delete product"});
    }
}

const productById = async (req, res) => {
    try {
        // Use req.params.id to get the product ID from the URL
        const product = await productModel.findById(req.params.id); 

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch product" });
    }
};


export { addProduct, productList, removeProduct, productById };