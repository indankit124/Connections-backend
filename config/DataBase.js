// getting-started.js
const mongoose = require('mongoose');



const DBConnect = async ()=> {
  await mongoose.connect('mongodb+srv://indankit12082000:62tIwQJkjTmE46EG@connections.kspykfj.mongodb.net/ConnectionApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}  ; 

module.exports = DBConnect;

