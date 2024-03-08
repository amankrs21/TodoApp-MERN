require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connect = require("./Config.js");
const router = require("./Router/Router.js");
const app = express();

app.use(express.json());

connect();

// Middleware to log all the requests
app.use((req, res, next) => {
    console.log("Requesting...", [`(${req.method}) http://${req.ip.slice(7)}${req.url}`], Date().slice(0, 24));
    next()
})

// setting up cors
const allowedOrigins = ["http://localhost:5173", "http://192.168.0.163:5173", "https://todomern.pages.dev"]
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
app.use(cors(corsOptions))

// setting up controller
app.use('/', router);


app.listen(3000, () => {
    console.log("Express running on... http://127.0.0.1:3000");
})
