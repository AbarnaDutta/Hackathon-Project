const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');


exports.deleteColumn = async (req, res) => {

    try {

        const {id, organisation} = req.body;

        if(!id || !organisation){
            return res.status(400).json({
                success: false,
                message: "Please provide all details"
            });
        }

        const column = await Columns.findOne({id: id});

        if(!column){
            return res.status(400).json({
                success: false,
                message: "Column not found"
            });
        }

        const taskManageBoard = await TaskManageBoard.findOne({organisation: organisation});

        if(!taskManageBoard){
            return res.status(400).json({
                success: false,
                message: "Task Manage Board not found"
            });
        }

        for(let i = 0; i < column.tasks.length; i++){
            const task = await Tasks.findByIdAndDelete(column.tasks[i]);
            taskManageBoard.tasks.pull(task._id);
        }

        taskManageBoard.columns.pull(column._id);
        taskManageBoard.save();

        await Columns.findByIdAndDelete(column._id);

        return res.status(200).json({
            success: true,
            message: `Column "${column.title}" deleted successfully`
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting column",
            error: error.message
        })
    }
}