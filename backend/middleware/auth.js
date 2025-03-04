import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
    const {token} = req.headers;
    if (!token){
        return res.status(401).json({success: false, message: "Unauthorized please login to access this resource"});
    }
    try {
        const token_decode = jwt.verify(token, process.env.SECRETE_KEY);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, message: "invalid token"});
    }
}

export default authMiddleWare