const express = require('express');
const app = express();
const { authenticate } = require('../middlewares/authenticate');
const connectionDB = require('../config/database');
const User = require('../models/user');
// app.use('/dashboard',authenticate,(req,res)=>{
//     throw new Error("Error da server la");
//     res.send("Hello da mapla dashboard la irrunthu....");
// });
app.use(express.json());

app.post('/signUp', async (req, res) => {
try {
    const user = new User(req.body);

    await user.save();
    res.send("User saved success fully");
} catch (error) {
    res.status(500).send("something went wrong " +error.message);
}


});

app.get('/user', async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if(user) res.send(user);
        else res.status(404).send("user not found")
   
    } catch (error) {
        res.status(500).send("something went wrong");
    };
});

app.get('/userId', async (req, res) => {

    try {
        const user = await User.findById(req?.body?.id);

        if (user) res.send(user);

        else res.status(404).send("User not found");
    } catch (error) {
        console.log({ INFO: "Error while fetching the user by Id -" + error.message });

        res.status(500).send("something went wrong");
    };

});

app.delete('/userId', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req?.body?.id); 

        if (user) res.send(user);

        else res.status(404).send("User not found");
    } catch (error) {
        console.log({ INFO: "Error while fetching the user by Id -" + error.message });

        res.status(500).send("something went wrong");
    };

});
// update 
// findByIdAndUpdate has three input aruguments 
// 1st is _id , 2nd is the data to update, 3rd options object  
app.patch('/userId', async (req, res) => {
    console.log({ INFO: "update user API called" });

    try {
        // const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body, { returnDocument: 'after' });
        // const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body,{lean:true});
        // const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body,{includeResultMetadata:true});
        const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body,{runValidators:true});

        if (user) res.send(user);

        else res.status(404).send("User not found");
    } catch (error) {
        console.log({ INFO: "Error while updating user by Id -" + error.message });

        res.status(500).send("something went wrong");
    };

});

app.use('/', (req, res, next) => {
    // res.send("vanakam da mapla server la irrunthu....");
    console.log("nan than da first response uh....");

    next()
    // res.send("Ithu 2nd response da mapla");
},
    (req, res, next) => {
        res.send("Ithu 2nd response da mapla");
        next();
    }
);

app.use('/', (err, req, res, next) => {

    console.log({ ERROR: err.message });

    res.status(500).send("sorry da mapla server la error");
});

connectionDB().then(() => {
    console.log({ INFO: "Database connected successfully........!" });
    app.listen(3000, () => {
        console.log("My application is running successfully");

    });

}).catch((error) => {
    console.error({ INFO: "Error in database connection -" + error.message });
});

