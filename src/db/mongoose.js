const mongoose = require('mongoose');

const connectionURL = 'mongodb://localhost:27017/task-manager-api';
console.log(connectionURL);
mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify : false
});