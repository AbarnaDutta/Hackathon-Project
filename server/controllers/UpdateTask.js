const Tasks = require('../models/Tasks');

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
