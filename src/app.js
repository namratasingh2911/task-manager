const express = require('express')
require('./db/mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
const cors = require('cors')

const app = express()

app.engine('html', require('ejs').renderFile);
app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist/http-node/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api",userRouter)
app.use(taskRouter)

console.log(__dirname +'../../../../http-node/dist');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

module.exports=app

