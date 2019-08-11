const mongoose = require('mongoose');

const connectionURL = 'mongodb://localhost:27017/task-manager-api';

mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useCreateIndex:true
})

const Tasks = mongoose.model('taskmanager',{
    description : {
       type : String,
       trim : true,
       required : true
    },
    status : {
       type : Boolean,
       default : false
    }
})

const task = new Tasks({
    description : 'Pot the plants    '
    
})

task.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})