const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');

exports.deleteTask = async (req, res) => {

    try {

        const { id, columnId, organisation } = req.body;

        if (!id || !columnId || !organisation) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const task = await Tasks.findOne({ id: id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: `Task not found`
            });
        }

        const column = await Columns.findOne({ id: columnId });

        if (!column) {
            return res.status(404).json({
                success: false,
                message: `Column not found`
            });
        }

        const taskManageBoard = await TaskManageBoard.findOne({ organisation: organisation });

        if (!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `Task Manage Board not found`
            });
        }

        taskManageBoard.tasks.pull(task._id);
        column.tasks.pull(task._id);

        await taskManageBoard.save();
        await column.save();

        await Tasks.findByIdAndDelete(task._id);

        return res.status(200).json({
            success: true,
            message: `Task deleted successfully`
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't delete task",
            error: error.message
        })
    }
}