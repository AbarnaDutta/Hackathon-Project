const express = require('express');
const router = express.Router();

const { createNewColumn, deleteColumn, updateColumn, getAllColumns } = require('../controllers/Column');
const { createNewTask, deleteTask, updateTask, getAllTasks } = require('../controllers/Tasks');
const { createNewBoard, updateBoard } = require('../controllers/Board');
const { createOrganisastion } = require('../controllers/Organisation');
 
router.post('/createOrganisation', createOrganisastion);
router.post('/createNewBoard', createNewBoard);
router.post('/createNewColumn', createNewColumn);
router.post('/createNewTask', createNewTask);
router.post('/getAllColumns', getAllColumns);
router.post('/getAllTasks', getAllTasks);
router.post('/updateColumn', updateColumn);
router.post('/updateTask', updateTask);
router.post('/deleteColumn', deleteColumn);
router.post('/deleteTask', deleteTask);
router.post('/updateBoard', updateBoard);

module.exports = router;