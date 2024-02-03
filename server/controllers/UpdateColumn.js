const Columns = require("../models/Columns");

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