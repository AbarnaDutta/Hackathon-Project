const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const Board = require('../models/Board');

exports.createNewColumn = async (req, res) => {
    try {
        const { id, title, boardId, organisation } = req.body;

        if (!id || !title || !organisation || !boardId) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        if(await Columns.findOne({id: id})){
            return res.status(404).json({
                success: false,
                message: "Column already exists"
            });
        }

        if(!await Board.findOne({id: boardId})){
            return res.status(404).json({
                success: false,
                message: "Board not found"
            });
        }

        const newColumn = new Columns({
            id: id,
            title: title,
            boardId: boardId,
            organisation: organisation
        });

        await newColumn.save();

        const taskManageBoard = await TaskManageBoard.findOne({ organisation: organisation });

        if(!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `No task manage board found for the organisation ${organisation}`
            });
        }

        taskManageBoard.columns.push(newColumn._id);
        await taskManageBoard.save();

        return res.status(200).json({
            success: true,
            message: `Column "${title}" created successfully`,
            data: newColumn
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't create new column",
            error: error.message
        });
    }
}

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

exports.getAllColumns = async (req, res) => {

    try {
        const {organisation} = req.body;

        if (!organisation) {
            return res.status(400).json({
                success: false,
                message: "Couldn't find organisation"
            });
        }

        const taskManageBoard = await TaskManageBoard.findOne({organisation: organisation}).populate('columns');

        if (!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `No task manage board found for the organisation ${organisation}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Fetched all the Columns successfully for the organisation ${organisation}`,
            data: taskManageBoard.columns
        });

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching all the columns",
            error: error.message
        });
    }
}

exports.updateColumn = async (req, res) => {

    try {

        const { id, title } = req.body;

        if(!id || !title){
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const column = await Columns.findOne({id: id});

        if(!column){
            return res.status(400).json({
                success: false,
                message: "Column not found"
            });
        }

        column.title = title;
        await column.save();

        return res.status(200).json({
            success: true,
            message: "Column updated successfully",
            data: column
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't update column",
            error: error.message
        })
    }
}