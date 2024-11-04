const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        minLength : 4,
        maxLength : 15
    },
    secondName: {
        type: String,
        minLength : 4,
        maxLength : 16
    },
    emailId: {
        type: String,
        required: true,
        unique: [true,"User already exits ! please login in your account!!!"],
        trim : true
    },
    password: {
        type: String,
        required:true,
        minLength:10
    },
    age: {
        type: Number,
        required:[true,"age is required for this application"],
        min:[18,"Sorry!!!! Concentrate in your studies this application is not for you...... !"],
        max:[50,"Sorry!! you have reached your maximum age you can now rest and play with your kids"],
    },
    gender: {
        type: String,
        validate : function(value){
            if(!['male','female','others'].includes(value)){
                console.log("This is error");
                
                throw new Error('gender data is invalid');
            };
        }
    },
    photoUrl:{
        type: String,
        default:"https//localhost:4000/url"
    },
    skills:[String]
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;