const express = require("express");
const VerifyUser = require("../Middleware/VerifyUser.js");
const VerifyAdmin = require("../Middleware/VerifyAdmin.js");
const { userLogin, userRegister, getAllUsers } = require("../Controller/UserController.js")
const { getTodos, addTodo, markComplete, updateTodo, deleteTodo } = require("../Controller/Controller.js");
const router = express.Router();

router.post('/auth/login', userLogin)
router.post('/auth/register', userRegister)
router.get('/admin/users', VerifyUser, VerifyAdmin, getAllUsers)
router.get('/todo', getTodos);
router.post('/todo/add', addTodo);
router.patch('/todo/complete/:id', markComplete);
router.patch('/todo/update', updateTodo)
router.delete('/todo/delete/:id', deleteTodo)

module.exports = router;
