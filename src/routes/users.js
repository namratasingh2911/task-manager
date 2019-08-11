require('../db/mongoose');

const express = require('express');
const router = new express.Router();
const User = require('../models/user');

//get reuest
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users);
    }
    catch (e) {
        res.status(404).send(e);
    }


})

//get request by Id

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send();
    }

})

//post request
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(401).send(e);
    }


});

//pacth request 
router.patch('/users/:id', async (req, res) => {
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            res.status(404).send();
        }
        res.status(200).send(user);
    }
    catch (e) {
        res.status(404).send();
    }
})

//Deleting the record
router.delete('/users                                                    /:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).send()
        }
        res.send(user);
    }
    catch(e){
        res.status(500).send();

    }
   
});

module.exports= router;