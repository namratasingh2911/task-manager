const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//const Task = require('./models/task')
const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5d52ae94a38e402cc4e77a81')
//     await user.populate('tasks').execPopulate()
//     console.log('hhh',user.tasks)
// }

//main()