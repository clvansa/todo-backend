const Todo = require('../model/todoModel');

exports.getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ uid: req.user.id });
        if (!todos) return res.status(400).json({ msg: "You don't have any task" });
        res.status(200).json(todos)
    } catch (err) {
        console.error(err)
    }
}


exports.addTodo = async (req, res, next) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
            uid: req.user.id
        });
        await newTodo.save()
        res.status(200).json(newTodo)
    } catch (err) {
        console.error(err)
    }
}

exports.delTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, uid: req.user.id });
        if (!todo) return res.status(400).json({ msg: "You don't have acsses to delete this task" });
        res.status(200).json(todo)
    } catch (err) {
        console.error(err)
    }
}

exports.checkCompleted = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id });
        if (!todo) return res.status(400).json({ msg: "somthing went Wrong" });
        todo.completed = !todo.completed;
        todo.save()
        res.status(200).json(todo)
    } catch (err) {
        console.error(err)
    }
}

exports.propertyTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndUpdate({ _id: req.params.id, uid: req.user.id }, { property: req.body.property }, { new: true });
        if (!todo) return res.status(400).json({ msg: "Task is not found" });
        res.status(200).json(todo)
    } catch (err) {
        console.error(err)
    }
}