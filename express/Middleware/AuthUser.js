const jwt = require("jsonwebtoken");
const Users = require("../Models/Users.js");
const SecretKey = process.env.SECRET_KEY;


const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.slice(7);

        if (!token) {
            return res.status(401).json({ message: "Token is not provided or invalid" });
        }

        const decoded = await jwt.verify(token, SecretKey);
        const user = await Users.findById(decoded?.id);

        if (!user || !['user', 'admin'].includes(user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.slice(7);

        if (!token) {
            return res.status(401).json({ message: "Token is not provided or invalid" });
        }

        const decoded = await jwt.verify(token, SecretKey);
        const user = await Users.findById(decoded?.id);

        if (!['admin'].includes(user.role)) {
            return res.status(401).json({ message: "You are not Authorised." });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const currentUserID = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7);

        if (!token) {
            throw new Error("Token is not provided or invalid");
        }

        const decoded = await jwt.verify(token, SecretKey);
        const user = await Users.findById(decoded?.id);

        if (!user) {
            throw new Error("Unauthorized");
        }

        return user._id;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { verifyUser, verifyAdmin, currentUserID };
