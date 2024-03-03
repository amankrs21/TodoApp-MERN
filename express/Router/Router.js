const express = require("express");
const { verifyUser, verifyAdmin } = require("../Middleware/AuthUser.js");
const { userLogin, userRegister, getAllUsers } = require("../Controller/UserController.js")
const { getTodos, addTodo, markComplete, updateTodo, deleteTodo } = require("../Controller/TodoController.js");
const router = express.Router();

router.post('/auth/login', userLogin)
router.post('/auth/register', userRegister)
router.get('/admin/users', verifyUser, verifyAdmin, getAllUsers)
router.get('/todo', verifyUser, getTodos);
router.post('/todo/add', addTodo);
router.patch('/todo/complete/:id', verifyUser, markComplete);
router.patch('/todo/update', verifyUser, updateTodo)
router.delete('/todo/delete/:id', verifyUser, deleteTodo)

module.exports = router;
