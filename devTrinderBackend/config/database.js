const mongoose = require('mongoose');

const connectionDB = async ()=>{
  await mongoose.connect("mongodb+srv://antilin18:stanis200118@namastenode.n3yua.mongodb.net/");
};


connectionDB().then(()=>{
    console.log({INFO: "Database connected successfully........!"});
    
}).catch((error)=>{
 console.error({INFO:"Error in database connection -"+error.message});
});