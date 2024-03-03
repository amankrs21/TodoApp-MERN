const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Users = require('../Models/Users.js');
const SecretKey = process.env.SECRET_KEY;

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
