const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    skills:[String],
    forgetPasswordOTP:{
        type: Number,
        default:null
    }
},{timestamps:true});


userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ id: user._id }, "mysecretkey", { expiresIn: '1d' });

    return token;
};

userSchema.methods.comparePassword = async function (password) {
    const user = this;

    const isValid = await bcrypt.compare(password, user.password);

    return isValid;
};


const User = mongoose.model("User", userSchema);
module.exports = User;