const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Users = require('../Models/Users.js');

const SecretKey = "a2f4c7e8b4a9d6f0e5b1c8a3f7e78cme6a1c7e9f4b5c1a8e3f7d4b9c1a8f3";

const userLogin = async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username });
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const token = jwt.sign({ id: user._id, role: user.role }, SecretKey, { expiresIn: '30m' });
                return res.status(200).json({ message: "User Logged in Successfully", token });
            }
        }
        return res.status(401).json({ message: "Invalid Credentials!!" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

const userRegister = async (req, res) => {
    if (await Users.findOne({ username: req.body.username })) {
        return res.status(409).json({ message: "Username Already Exist!!" });
    }
    const user = new Users({
        "username": req.body.username,
        "password": await bcrypt.hash(req.body.password, 10),
        "name": req.body.name,
        "role": "user"
    })
    await user.save().then((e) => {
        return res.status(201).json({ message: "User Registerd Successfully!!", e });
    }).catch((e) => {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" })
    })
}

const getAllUsers = async (req, res) => {
    const users = Users.find({}).then((e) => {
        return res.status(200).json(e);
    }).catch((e) => {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!!" })
    })
}

module.exports = { userLogin, userRegister, getAllUsers }
