require('../db/mongoose');

const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

//get reuest
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks);
    }
    catch (e) {
        res.status(404).send(e);
    }


})

//get request by Id

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    }
    catch (e) {
        res.status(500).send();
    }

})

//post request
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(401).send(e);
    }


});

//pacth request 
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'status'];

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    )
    console.log(updates, allowedUpdates);
    console.log(isValidOperation);

    if (!isValidOperation) {
        res.status(404).send('error: Invalid Update');
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            res.status(404).send();
        }
        res.status(200).send(task);
    }
    catch (e) {
        res.status(404).send();
    }
})

//Deleting the record
router.delete('/tasks                                                    /:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(404).send()
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send();

    }
   
});

module.exports= router;