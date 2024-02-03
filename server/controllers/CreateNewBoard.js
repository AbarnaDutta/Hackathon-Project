const TaskManageBoard = require('../models/TaskManageBoard');

exports.createNewBoard = async (req, res) => {
    try {
        const { organisation } = req.body;

        if (!organisation) {
            return res.status(400).json({
                success: false,
                message: "Couldn't find organisation"
            });
        }

        const taskManageBoard = new TaskManageBoard({
            organisation: organisation
        });

        await taskManageBoard.save();

        return res.status(200).json({
            success: true,
            message: `Task manage board created successfully for the organisation ${organisation}`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't create new task manage board",
            error: error.message
        });
    }
}