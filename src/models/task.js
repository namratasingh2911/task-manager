const mongoose = require('mongoose');

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

module.exports = Tasks;