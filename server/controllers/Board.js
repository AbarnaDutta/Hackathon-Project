const TaskManageBoard = require('../models/TaskManageBoard');
const Board = require('../models/Board');

exports.createNewBoard = async (req, res) => {
    try {
        const { organisation, id, title } = req.body;

        if (!organisation || !id || !title) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        if(await Board.findOne({id: id})) {
            return res.status(404).json({
                success: false,
                message: "The Board already exists"
            });
        }

        const board = new Board({
            id: id,
            title: title,
            organisation: organisation
        });

        await board.save();

        const taskManageBoard = await TaskManageBoard.findOne({ organisation: organisation });

        if (!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `No task manage board found for the organisation ${organisation}`
            });
        }

        taskManageBoard.boards.push(board._id);
        taskManageBoard.save();

        return res.status(200).json({
            success: true,
            message: `A new Task manage board created successfully for the organisation ${organisation}`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't create new task manage board",
            error: error.message
        });
    }
}

exports.updateBoard = async (req, res) => {

    try {

        const { id, title } = req.body;

        if (!id || !title) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const board = await Board.findOne({ id: id });

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board not found"
            });
        }

        board.title = title;
        await board.save();

        return res.status(200).json({
            success: true,
            message: "Board updated successfully",
            data: board
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't update the task manage board",
            error: error.message
        })
    }
}

exports.deleteBoard = async (req, res) => {

    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't delete the task manage board",
            error: error.message
        })
    }
}