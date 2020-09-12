const express = require('express');
const router = express.Router();
const { getTodos, addTodo, delTodo, checkCompleted, propertyTodo } = require('../controller/todoController');
const Auth = require('../util/Auth');

router.get('/get', Auth, getTodos);
router.post('/add', Auth, addTodo);
router.delete('/:id', Auth, delTodo);
router.put('/:id', Auth, checkCompleted);
router.put('/property/:id', Auth, propertyTodo);





module.exports = router