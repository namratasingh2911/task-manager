const request= require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app');
const {objectId,userOne,setUpDatabase,taskOne,
    taskTwo,
    taskThree,
    userTwo} = require('./fixtures/db')

beforeEach(setUpDatabase)
test('Should create task for users',async()=>{
    const response = await request(app).post('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description : 'Clan the house'
    }).expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()


})

test("Get all task for the user",async()=>{
    const response = await request(app).get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)

})

test("Other users should not delete someone else task",async()=>{
    await request(app).delete(`/task/${taskOne._id}`)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = Task.findById(taskOne._id)
    expect(task).not.toBeNull()

})