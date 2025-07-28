const tasks = require('../model/model');

const getTasks = async (req, res) => {
    try {
        const task = await tasks.find({});
        if (task.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};
const singleTasks = async (req, res) => {
    try {
        const {id}=req.params
        const task = await tasks.findOne({_id:id});
        if (task.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

const createTask = async (req, res) => {
    try {
        const { task } = req.body;
    const createdTAsk = await tasks.create({ task });
        res.status(200).json(createdTAsk);
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error)
}
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;

        const updatedTask = await tasks.findOneAndUpdate(
            { _id: id },
            { task },
            { new: true }
        );

        if (!updateTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await tasks.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

module.exports = { getTasks,singleTasks, createTask, updateTask, deleteTask };