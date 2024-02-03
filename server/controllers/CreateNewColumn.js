const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');

exports.createNewColumn = async (req, res) => {
    try {
        const { id, title, organisation } = req.body;

        if (!id || !title || !organisation) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const newColumn = new Columns({
            id: id,
            title: title,
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