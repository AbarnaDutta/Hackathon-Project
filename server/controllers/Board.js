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