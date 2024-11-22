const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { validateSignUpAPI } = require('../utils/vaildator');

router.post("/signUp", async (req, res) => {
    try {

        validateSignUpAPI(req);
        const { firstName, secondName, emailId, password, age } = req.body;

        let passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ firstName, secondName, emailId, password: passwordHash, age });

        await user.save();
        res.send("User saved success fully");
    } catch (error) {
        console.log({ Error: "something went wrong " + error.message });
        res.status(500).send("something went wrong " + error.message);
    };
});

router.post("/login", async (req, res) => {

    try {
      let isCorrectPassword;
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId: emailId }, 'password _id');
  
      if (user) {
  
        isCorrectPassword = await user.comparePassword(password);
  
        if (isCorrectPassword) {
          const token = await user.getJWT();
          
          res.cookie('token', token, { expires: new Date(Date.now() +  7 * 24 * 60 * 60 * 1000), httpOnly: true });
              
          res.send('Login successfull');
        }
        else throw new Error('incorrect password!!! please enter the correct password');
  
      } else throw new Error('User doest not exits!!! please create a new account.....!!');
  
  
    } catch (error) {
      res.status(500).send("Error : " + error.message);
    };
  });
module.exports = router;