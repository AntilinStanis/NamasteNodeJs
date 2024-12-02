const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type:  mongoose.Schema.Types.ObjectId ,
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

connectionRequestSchema.pre('save',function(){
    const connectionRequestData = this;

    if(this.fromUserId === this.toUserId)throw new Error('Cannot Send Connection request to yourself');
        
    
    

});

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequest;