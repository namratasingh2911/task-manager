const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user')
const {objectId,userOne,setUpDatabase} = require('./fixtures/db')


beforeEach(setUpDatabase)

afterEach(()=>{
    console.log('after each')
})

 test("Should Signup a new user",async ()=>{
     const response = await request(app).post('/users').send({
         name : 'Namrata',
         email : 'namrataa@gmail.com',
         password:'MyPass123'
     }).expect(201)

     //Assert that the database was changed correctly
 const user = await User.findById(response.body.user._id)
 expect(user).not.toBeNull()

 //Assertion about the response
 
 expect(response.body).toMatchObject({
     user : {
         name : 'Namrata',
         email : 'namrataa@gmail.com',
     },
     token : user.tokens[0].token
 })

 expect(user.password).not.toBe('MyPass123')

    });
 
    test("Should login a existing user",async ()=>{
    const response =    await request(app).post('/users/login').send({
            email : userOne.email,
            password:userOne.password
        }).expect(200)
     const user = await User.findById(response.body.user._id);
     expect(response.body.token).toBe(user.tokens[1].token)

       });

       test("Should not logged in the non-existent error",async ()=>{
        await request(app).post('/users/login').send({
            email : userOne.email,
            password:'thispassword'
        }).expect(400)
       });

       test("to get the profile of the user",async()=>{
           await request(app)
           .get('/users/me')
           .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
           .send()
           .expect(200)
       })

       test("should not get the profile of unauthenticated user",async()=>{
        await request(app)
        .get('/users/me')
        .send()
        .expect(401)
    })

    test("should delete the profile of authenticated user",async()=>{
       await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const user = await User.findById(objectId)
        expect(user).toBeNull()

    })

    test("should not delete the profile of unauthenticated user",async()=>{
        await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    })

     test('Should upload an avatar',async()=>{
         await request(app)
         .post('/users/me/avatar')
         .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
         .attach('avatar','tests/fixtures/profile-pic.jpg')
         .expect(200)
    const user = await User.findById(objectId);
    expect(user.avatar).toEqual(expect.any(Buffer))

     })

     test("Should update valid fields",async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name : 'John'
    })
    .expect(200)

    const user = await User.findById(objectId)
    expect(user.name).toEqual('John')


     })

     test("Should not update invalid fields",async()=>{
        await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location : 'John'
        })
        .expect(400)
    
    
         })
   

 