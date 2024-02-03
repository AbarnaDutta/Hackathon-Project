const TaskManageBoard = require('../models/TaskManageBoard');
const Board = require('../models/Board');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');

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

        const { id, organisation } = req.body;

        if (!id || !organisation) {
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

        const taskManageBoard = await TaskManageBoard.findOne({ organisation: organisation });

        if (!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `No task manage board found for the organisation ${organisation}`
            });
        }

        taskManageBoard.boards = taskManageBoard.boards.filter((boardId) => boardId.toString() !== board._id.toString());

        const allColumns = await Columns.find({});

        console.log("allColumns: ", allColumns);

        for (const column of allColumns) {
            if (column.boardId.toString() === board.id.toString()) {
                await Columns.findByIdAndDelete(column._id);
                await taskManageBoard.columns.pull(column._id);
                console.log("Deleted column: ", column);
            }
        }

        const allTasks = await Tasks.find({});

        for (const task of allTasks) {
            if (task.boardId.toString() === board.id.toString()) {
                await Tasks.findByIdAndDelete(task._id);
                await taskManageBoard.tasks.pull(task._id);
                console.log("Deleted task: ", task);
            }
        }

        await Board.findByIdAndDelete(board._id);
        taskManageBoard.save();

        return res.status(200).json({
            success: true,
            message: "Board deleted successfully"
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't delete the task manage board",
            error: error.message
        })
    }
}