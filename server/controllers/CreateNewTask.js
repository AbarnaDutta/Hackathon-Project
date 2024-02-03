const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');

exports.createNewTask = async (req, res) => {

    try {
        const { id, content, columnId, organisation } = req.body;

        if (!id || !content || !columnId || !organisation) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const newTask = new Tasks({
            id: id,
            columnId: columnId,
            content: content,
            organisation: organisation
        });

        await newTask.save();

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