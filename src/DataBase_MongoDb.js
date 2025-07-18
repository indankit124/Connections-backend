// const { MongoClient } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb+srv://indankit12082000:62tIwQJkjTmE46EG@connections.kspykfj.mongodb.net/';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'Connection_main';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('User_New');

//   // the following code examples can be pasted here...

// const Data =[ {
//   firstName:"Vishal",
//   lastName:"Mahala",
//   email:"ankitmahala@mail.com",
//   mobileNo:"5682954752"
// }, 
// {
//   firstName:"SACHIN",
//   lastName:"Mahala",
//   email:"SACHINmahala@mail.com",
//   mobileNo:"5682954752"
// }]
// ;

// const insertResult = await collection.insertMany(Data);
// console.log('Inserted documents =>', insertResult);


// const CountingValues = await collection.drop({})
// console.log(CountingValues)

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());