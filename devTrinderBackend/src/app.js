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

    let userObj = {
        firstName: req?.body?.firstName,
        secondName: req?.body?.secondName,
        emailId: req?.body?.emailId,
        password: req?.body?.password

    };
    const user = new User(userObj);

    await user.save();
    res.send("User saved success fully");

});

app.get('/user', async (req, res) => {
    try {
        const user = await User.find({ emailId: req.body.emailId });
        if(user.length) res.send(user);
        else res.status(404).send("user not found")
   
    } catch (error) {
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

