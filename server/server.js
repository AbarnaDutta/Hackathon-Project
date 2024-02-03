const express = require('express');
const app = express();
require('dotenv').config();

const TaskBoard = require('./routes/TaskBoard');

const dbConnect = require('./config/database');
const cors = require('cors');

app.use(express.json());

app.use(cors());

dbConnect();

app.use('/api/v1', TaskBoard);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the home route for the server"
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});