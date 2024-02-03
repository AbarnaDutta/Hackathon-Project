const TaskManageBoard = require('../models/TaskManageBoard');

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