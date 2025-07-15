const mongoose = require('mongoose');

const connectionDB = async ()=>{
  console.log({connectionString : process.env.MONGODB_CONNECTION_STRING})
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
};

module.exports = connectionDB;

