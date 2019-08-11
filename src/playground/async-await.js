require('../db/mongoose');
const Task = require('../models/task');

const UpdatedTaskAndCount = async(id,status) =>{
    const task = await Task.findByIdAndUpdate(id,{status});
    const count = await Task.countDocuments({status});
    return count;
}

UpdatedTaskAndCount('5d4fc77820f48e08683797d0',true).then((count)=>{
console.log(count);
}).catch((e)=>{
console.log(e)
})