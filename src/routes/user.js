const express = require('express');
const User = require('../models/user');
const router = new express.Router();


router.get('/users/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("Not Found")
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send();
    }

    // const _id = req.params.id;
    // User.findById(_id).then(user => {
    //     if (!user) {
    //         return res.status(404).send("Not Found")
    //     }
    //     res.status(200).send(user);
    // }).catch(e => {
    //     res.status(500).send()
    // })
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }

    // User.find({}).then(users => {
    //     res.send(users);
    // }).catch(e => {
    //     res.status(500).send(e);
    // })
})

router.post('/users', async (req, res) => {
    let user = new User(req.body);

    try {
        const response = await user.save();
        res.send(response);
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(response => {
    //     res.send(response);
    // }).catch(error => {
    //     res.status(400).send(error)
    // });
});

router.patch('/users/:id', async (req, res) => {
    try {
        let updates = Object.keys(req.body);
        let allowedUpdates = ["name", "age", "email", "password"]
        let invalidArray = updates.filter(val => allowedUpdates.indexOf(val) == -1)
        if (invalidArray.length)
            return res.status(500).send({ error: "Invalid property" })
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user)
            return res.status(404).send("Not found");
        res.send(user);
    }
    catch (e) {
        res.status(400).send(e);
    }

});

router.delete('/users/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).send("Not found")
        res.send(user)
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;