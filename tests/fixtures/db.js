const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const objectId = new mongoose.Types.ObjectId;
const userOne = {
    _id : objectId,
    name : 'Namrata',
    email : 'abhimanyu@gmail.com',
    password : 'Abhi123',
    tokens : [{
        token : jwt.sign({_id : objectId},process.env.JWT_SECRET)
    }]
}

    const objectIdTwo = new mongoose.Types.ObjectId;
    const userTwo = {
        _id : objectIdTwo,
        name : 'Namrataa',
        email : 'abhimanyuu@gmail.com',
        password : 'Abhi123',
        tokens : [{
            token : jwt.sign({_id : objectIdTwo},process.env.JWT_SECRET)
        }]
    }

    const taskOne = {
        _id : new mongoose.Types.ObjectId(),
        description : 'first task',
        completed : false,
        owner : userOne._id
    }

    const taskTwo = {
        _id : new mongoose.Types.ObjectId(),
        description : 'second task',
        completed : true,
        owner : userOne._id
    }

    const taskThree = {
        _id : new mongoose.Types.ObjectId(),
        description : 'third task',
        completed : false,
        owner : userTwo._id
    }
    
const setUpDatabase = async()=>{
    await User.deleteMany({})
    await Task.deleteMany({})
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    objectId,
    userOne,
    taskOne,
    taskTwo,
    taskThree,
    userTwo,
    setUpDatabase
}