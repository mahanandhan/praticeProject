import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({success: true, message: "Logged in successfully", token});
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRETE_KEY)
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).send("Invalid email");
        }
        if(password.length<8){
            return res.status(400).json({success: false, message: "Password must be at least 8 characters long"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({name, email, password: hashedPassword});
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, message: "User created successfully", token});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Something went wrong"});
    }

}

export {loginUser, registerUser};