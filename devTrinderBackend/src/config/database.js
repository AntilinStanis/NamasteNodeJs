const mongoose = require('mongoose');

const connectionDB = async ()=>{
  await mongoose.connect("mongodb+srv://antilin18:stanis200118@namastenode.n3yua.mongodb.net/devTinder");
};

module.exports = connectionDB;

