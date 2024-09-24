const crypto = require('crypto');
const Password = require('../Models/Password.js');
const { currentUserID } = require("../Middleware/AuthUser.js");

const defaultKey = 'G4j@2h!pX1q#k9M^sT7z%fL8vB3w*R6jY';

// code to encrypt the password
const encrypt = (text, key) => {
    let finalKey = Buffer.from(key + defaultKey.slice(key.length), 'utf-8').slice(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', finalKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};


// code to decrypt the password
const decrypt = (text, key) => {
    let finalKey = Buffer.from(key + defaultKey.slice(key.length), 'utf-8').slice(0, 32);
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', finalKey, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};


const passwordAdd = async (req, res) => {
    try {
        const { key, name, username, password: rawPassword } = req.body;
        if (!key || !name || !username || !rawPassword) {
            return res.status(400).json({ message: "Please provide all required fields!" });
        }

        const userID = await currentUserID(req, res);
        const password = new Password({
            name,
            username,
            password: encrypt(rawPassword, key),
            createdBy: userID
        });

        await password.save();
        return res.status(201).json({ message: "Password Added Successfully!", password });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

const passwordGet = async (req, res) => {
    try {
        const { key } = req.body;
        if (!key) {
            return res.status(400).json({ message: "Please provide the key!" });
        }
        const userID = await currentUserID(req, res);
        const passwords = await Password.find({ createdBy: userID });
        try {
            passwords.forEach(password => {
                password.password = decrypt(password.password, req.body.key);
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid Key!" });
        }
        return res.status(200).json(passwords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

module.exports = { passwordAdd, passwordGet };
