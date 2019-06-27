const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }

    // Task.find({}).then((tasks) => {
    //     res.status(200).send(tasks);
    // }).catch(e => {
    //     res.status(500).send(e);
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task)
            return res.status(404).send("Not Found")
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }

    // Task.findById(_id).then(task => {
    //     if (!task)
    //         return res.status(404).send("Not Found")
    //     res.send(task);
    // }).catch(e => {
    //     res.status(500).send(e);
    // })
})

router.post('/tasks', async (req, res) => {
    let task = new Task(req.body);

    try {
        const tasks = await task.save();
        res.send(tasks)
    } catch (e) {
        res.status(400).send(e);
    }

    // task.save().then(response => {
    //     res.send(response)
    // }).catch(e => {
    //     res.status(400).send(e);
    // })
});

router.patch('/tasks/:id', async (req, res) => {
    try {
        let allowedUpdates = ["completed", "description"];
        let updates = Object.keys(req.body);
        let updateArray = updates.filter(val => allowedUpdates.indexOf(val) == -1);
        if (updateArray.length)
            res.status(400).send({ "error": "Invalid request" })
        let task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send("Not found")
        }
        res.status(200).send(task)

    } catch (e) {
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id', async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        if (!task)
            return res.status(404).send("Not found");
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;