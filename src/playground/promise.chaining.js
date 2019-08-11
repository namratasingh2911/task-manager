require('../db/mongoose');
const Task = require('../models/task');

Task.findByIdAndUpdate('5d4fc07099b5222f5000fa0d',{status : true})
.then((task)=>{
    console.log(task)
 return Task.countDocuments({status: false}).then((task)=>{
     console.log(task);
 })
}).catch((e)=>{
    console.log(e)
})