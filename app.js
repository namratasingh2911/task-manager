const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost:27017';
const databaseName ='task-manager';

MongoClient.connect(connectionURL,{useNewUrlParser :  true},(error,client)=>{
    if(error) {
        console.log('Unable to connect db fpr');
    }
    const db = client.db(databaseName);

//Insert The Document
    // db.collection('taskmanager').insertMany([{
    //    description : 'Cleaning the house',
    //     status : true
    // },{
    //     description : 'Pot the plants',
    //     status : false
    // }],(error,res)=>{
    //     if(error){
    //         return console.log('Unabe to insert user')
    //     }

    //     console.log(res.ops);
    // })

//Selecting the Docuemnt 

db.collection('taskmanager').find({status : true}).count((error,user)=>{
    if(error){
        console.log('The data not found')
    }

    else
    console.log(user);
})

//Updating the Docuemnt
// db.collection('taskmanager')
// .updateMany({status : true},{
//     $set : {
//         status : false
//     }
// })
// .then((result)=>{
//  console.log(result)
// })
// .catch(()=>{
// console.log(error)
// })

//Deleting the document
db.collection('taskmanager').deleteMany({status: false})
.then((result)=>{
console.log(result);
})
.catch((error)=>{
console.log(error)
})


})