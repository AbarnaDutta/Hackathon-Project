const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const Board = require('../models/Board');

exports.createNewTask = async (req, res) => {

    try {
        const { id, content, columnId, boardId, organisation } = req.body;

        if (!id || !content || !columnId || !organisation || !boardId) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        if(await Tasks.findOne({id: id})){
            return res.status(404).json({
                success: false,
                message: "Task already exists"
            });
        }

        if(!await Board.findOne({id: boardId})){
            return res.status(404).json({
                success: false,
                message: "Board not found"
            });
        }

        const newTask = new Tasks({
            id: id,
            columnId: columnId,
            boardId: boardId,
            content: content,
            organisation: organisation
        });

        const taskManageBoard = await TaskManageBoard.findOne({ organisation: organisation });
        const column = await Columns.findOne({ id: columnId });

        if(!taskManageBoard || !column) {
            return res.status(404).json({
                success: false,
                message: `Few Details not found for the organisation ${organisation}`
            });
        }
        
        taskManageBoard.tasks.push(newTask._id);
        column.tasks.push(newTask._id);

        await newTask.save();
        await taskManageBoard.save();
        await column.save();

        return res.status(200).json({
            success: true,
            message: `Task inside column "${columnId}" created successfully`,
            data: newTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't create new task",
            error: error.message
        });
    }
}

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

exports.updateTask = async (req, res) => {

    try {

        const { id, content } = req.body;

        if(!id || !content){
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const task = await Tasks.findOne({ id: id });

        if(!task){
            return res.status(400).json({
                success: false,
                message: "Task not found"
            });
        }

        task.content = content;
        await task.save();
        
        return res.status(200).json({
            success: true,
            message: "Task updated"
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't update task",
            error: error.message
        })
    }
}

exports.getAllTasks = async (req, res) => {

    try {
        const { organisation } = req.body;

        if(!organisation) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const taskManageBoard = await TaskManageBoard.findOne({ organisation: organisation }).populate('tasks');

        if(!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `No task manage board found for the organisation ${organisation}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Fetched all the tasks successfully for the organisation ${organisation}`,
            data: taskManageBoard.tasks
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching all the tasks",
            errorMessage: error.message
        });
    }
}