const jwt = require("jsonwebtoken");
const Users = require("../Models/Users.js");
const SecretKey = "a2f4c7e8b4a9d6f0e5b1c8a3f7e78cme6a1c7e9f4b5c1a8e3f7d4b9c1a8f3";

const VerifyUser = async (req, res, next) => {
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

module.exports = VerifyUser;
