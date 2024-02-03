const express = require('express');
const router = express.Router();

const { createNewColumn } = require('../controllers/CreateNewColumn');
const { createNewTask } = require('../controllers/CreateNewTask');
const { createNewBoard } = require('../controllers/CreateNewBoard');
const { getAllColumns } = require('../controllers/GetAllColumns');
const { getAllTasks } = require('../controllers/GetAllTasks');
const { deleteColumn } = require('../controllers/DeleteColumn');
const { deleteTask } = require('../controllers/DeleteTask');
const { updateColumn } = require('../controllers/UpdateColumn');
const { updateTask } = require('../controllers/UpdateTask'); 
 
router.post('/createNewBoard', createNewBoard);
router.post('/createNewColumn', createNewColumn);
router.post('/createNewTask', createNewTask);
router.post('/getAllColumns', getAllColumns);
router.post('/getAllTasks', getAllTasks);
router.post('/deleteColumn', deleteColumn);
router.post('/deleteTask', deleteTask);
router.post('/updateColumn', updateColumn);
router.post('/updateTask', updateTask);

module.exports = router;