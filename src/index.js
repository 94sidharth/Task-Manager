const express = require('express');
require('./db/mongoose.js');

const User = require('./models/user.js');
const Task = require('./models/task.js');

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
    console.log("Server is up and running");
})