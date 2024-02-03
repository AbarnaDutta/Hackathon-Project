const Organisation = require('../models/Organisation');
const TaskManageBoard = require('../models/TaskManageBoard');

exports.createOrganisastion = async (req, res) => {

    try {
        const {id, name} = req.body;

        if(!id || !name) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            })
        }

        const organisation = new Organisation({
            id: id,
            name: name
        });

        await organisation.save();

        const taskManageBoard = new TaskManageBoard({
            organisation: name
        });

        await taskManageBoard.save();

        return res.status(200).json({
            success: true,
            message: "Organisation created successfully",
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Can't create Organisation"
        });
    }
}