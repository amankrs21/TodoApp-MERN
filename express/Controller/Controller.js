const TodoSchema = require("../Models/Todo.js");

const getTodos = async (req, res) => {
    // get all todos
    await TodoSchema.find({}).then((e) => {
        return res.status(200).json(e);
    }).catch((e) => {
        return res.status(500).json(e);
    });
}

const addTodo = async (req, res) => {
    // if (TodoSchema.findOne({title: req.body.title}))
    //     return res.status(409).json({message: "Todo Already Exist"})
    const todo = new TodoSchema({
        "title": req.body.title,
        "discription": req.body.discription,
        "completed": req.body.completed
    });
    await todo.save().then((e) => {
        return res.status(201).json(e);
    }).catch((e) => {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"});
    });
}

const markComplete = async (req, res) => {
    try {
        const todo = await TodoSchema.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();
        return res.status(200).json(updatedTodo);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const updateTodo = async (req, res) => {
    try {
        const todo = await TodoSchema.findOne({ title: req.body.title });
        if (!todo)
            return res.status(404).json({ message: 'Todo Not Found' });

        todo.discription = req.body.discription;
        const updatedTodo = await todo.save();

        return res.status(200).json(updatedTodo);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = TodoSchema.findById(req.params.id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found!!" })
        await todo.deleteOne();
        return res.status(200).json({ message: "Todo Deleted Successfully!!" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { getTodos, addTodo, markComplete, updateTodo, deleteTodo };
