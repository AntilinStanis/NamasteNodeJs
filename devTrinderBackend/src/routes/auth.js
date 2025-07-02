const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { validateSignUpAPI } = require('../utils/vaildator');
const {generateOTP, sendMail ,replaceHtmlContent , verifyOTP} = require('../Services/common.service');
const config = require('../config/config');

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
    const user = await User.findOne({ emailId: emailId });

    if (user) {

      isCorrectPassword = await user.comparePassword(password);

      if (isCorrectPassword) {
        const token = await user.getJWT();

        res.cookie('token', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });

        let userData = { firstName: user.firstName, lastName: user.lastName, age: user.age, gender: user.gender, photoUrl: user.photoUrl, about: user.about, skills: user.skills };

        res.json({message:"signin successful",user: userData});
      }
      else throw new Error('incorrect password!!! please enter the correct password');

    } else throw new Error('User doest not exits!!! please create a new account.....!!');


  } catch (error) {
    res.status(500).send("Error : " + error.message);
  };
});


router.post('/logout', async function (req, res) {
  res.cookie('token', null, { expires: new Date(Date.now()) });
  res.send("logout successfull");
});

router.post('/forget', async (req, res) => {

  try {
    if (req?.body?.emailId) {
      const user = await User.findOne({ emailId: req.body.emailId }, '_id emailId firstName');

      if (!user) throw new Error("Account doest not exits...! Please Provide the Correct Email or Create a new account");

      const OTP = await generateOTP(req.body.emailId);

      // const updateUser = await User.findByIdAndUpdate(user._id, { forgetPasswordOTP: OTP });

      // if (!updateUser) throw new Error(`failed to update the document with id - ${user.emailId}`);

      const htmlContent = await replaceHtmlContent(config.FORGET_PASSWORD_MAIL.html,{UserName :user.firstName,OTP:OTP});

      const sendMailStatus = await sendMail("FORGET_PASSWORD_MAIL", user.emailId,htmlContent);

      if (!sendMailStatus) throw new Error(`failed to send forget password mail for the email id - ${user.emailId}`);

      res.json({ INFO: `Forget Password Email has been sent to the email address - ${user.emailId}` });

    } else throw new Error('emailId is missing');

  } catch (error) {
    console.log({ ERROR: `failed to send forget password mail with error - ${error.message} ` });

    res.status(500).json({Error :  error.message});
  };

});

router.post('/verifyOTP', async (req, res) => {
  try {
    if (req?.body?.OTP && req?.body?.emailId) {

      const otpStatus = await verifyOTP(req?.body?.OTP, req?.body?.emailId);
         
      if (otpStatus) return res.json({ INFO: "OTP verified" });

      else throw new Error('Invalid OTP. Please check the code and try again.');

    } else throw new Error('OTP is Missing');
  } catch (error) {
    console.log({ ERROR: `failed to send forget password mail with error - ${error.message} ` });

    res.status(500).json({ Error: error.message });
  }
});

module.exports = router;