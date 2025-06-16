const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type:  mongoose.Schema.Types.ObjectId ,
        ref:"User", // to add reference to the user table like we add foreign key in postgres
        required : true
    },
    toUserId :{
        type: mongoose.Schema.Types.ObjectId ,
        required : true
    },
    status : {
        type : String,
        enum :{
            values : ['interested','ignored','accepted','rejected'],
            message : '{VALUE} is not a status'
        }
    }
},{timestamps:true});

connectionRequestSchema.pre('save',function(next){
    const connectionRequestData = this;
     
    if(connectionRequestData.fromUserId.equals(connectionRequestData.toUserId)){
        
        throw new Error('Cannot Send Connection request to yourself');
    };
        
    next();

});

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequest;