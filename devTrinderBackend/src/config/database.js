const mongoose = require('mongoose');

const connectionDB = async ()=>{
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
};

module.exports = connectionDB;

