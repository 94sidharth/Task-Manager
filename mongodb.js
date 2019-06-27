const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const databaseName = "task-manager";
const connectionUrl = "mongodb://127.0.0.1:27017";

// console.log(new ObjectID())

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error)
        return console.log("Unable to connect to database");
    console.log("Connection established");

    const db = client.db(databaseName);

    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID("5cfa228d5871474ef0006f16")
    //     },
    //     {
    //         $set: {
    //             name: 'John'
    //         }
    //     }
    // ).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany(
    //     {
    //         completed:'No'
    //     },
    //     {
    //         $set:{
    //             completed:'yes'
    //         }
    //     }
    // ).then(result=>{
    //     console.log(result)
    // }).catch(error=>{
    //     console.log(error);
    // })

    db.collection('tasks').deleteMany({
        description : "Task 1"
    }).then(result=>console.log(result)).catch(error=>console.log(error));

    // db.collection('users').find({age:24}).toArray((error,users)=>{
    //     if(error)
    //     return console.log("Unexpected error occured");
    //     console.log(users);
    // })

    // db.collection('tasks').find({completed:'No'}).toArray((error,tasks)=>{
    //     if(error)
    //     return console.log("Unexpected error occured");
    //     console.log(tasks)
    // })

    // db.collection('users').insertOne({
    //     name:'Sidharth',
    //     age:24
    // },(error,result)=>{
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany(
    //     [
    //         {
    //             name:"test1",
    //             age:1
    //         },
    //         {
    //             name:"test2",
    //             age:2
    //         },
    //         {
    //             name:"test3",
    //             age:3
    //         },
    //     ],
    //     (error,result)=>{
    //         console.log(result.ops)
    //     }
    // )


    // db.collection('tasks').insertMany([
    //     {
    //         description: "Task 3",
    //         completed: "Yes"
    //     },
    //     {
    //         description: "Task 4",
    //         completed: "No"
    //     }
    // ],
    //     (error, result) => {
    //         console.log(result.ops);
    //     })
})