const TaskManageBoard = require('../models/TaskManageBoard');

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