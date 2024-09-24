const express = require("express");
const { verifyUser, verifyAdmin } = require("../Middleware/AuthUser.js");
const { userLogin, userRegister, getAllUsers, resetPassword, changeActiveState } = require("../Controller/UserController.js")
const { getTodos, getTodoById, addTodo, markComplete, updateTodo, deleteTodo } = require("../Controller/TodoController.js");
const { passwordAdd, passwordGet } = require("../Controller/PasswordController.js");
const router = express.Router();

router.post('/auth/login', userLogin)
router.post('/auth/register', userRegister)
router.patch('/auth/reset', verifyUser, resetPassword)
router.patch('/auth/active', verifyUser, verifyAdmin, changeActiveState)
router.get('/admin/users', verifyUser, verifyAdmin, getAllUsers)
router.get('/todo', verifyUser, getTodos);
router.get('/todo/:id', verifyUser, getTodoById);
router.post('/todo/add', verifyUser, addTodo);
router.patch('/todo/update', verifyUser, updateTodo)
router.patch('/todo/complete/:id', verifyUser, markComplete);
router.delete('/todo/delete/:id', verifyUser, deleteTodo)
router.post('/password/add', verifyUser, passwordAdd);
router.get('/password', verifyUser, passwordGet);

module.exports = router;
