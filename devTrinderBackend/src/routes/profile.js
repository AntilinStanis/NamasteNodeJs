const express = require('express');
const router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const {authenticate} = require('../middlewares/authenticate');

router.get("/user", authenticate, async (req, res) => {

    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (user) res.send(user);
        else res.status(404).send("user not found");

    } catch (error) {
        console.log({ Error: "something went wrong" + error.message });
        res.status(500).send("something went wrong");
    };
});

router.delete("/userId", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req?.body?.id);

        if (user) res.send(user);
        else res.status(404).send("User not found");
    } catch (error) {
        console.log({
            INFO: "Error while fetching the user by Id -" + error.message,
        });

        res.status(500).send("something went wrong");
    }
});

router.get("/profile", async (req, res) => {

    try {
      const token = req?.cookies?.token;
  
      if (token) {
        const userId = await jwt.verify(token, 'mysecretkey');
        if (userId) {
          const user = await User.findById(userId.id);
  
          if (user) res.send(user);
          else throw new Error('Unauthorized');
  
        } else throw new Error('Unauthorized');
  
      } else throw new Error('Token is not valid!');
  
    } catch (error) {
     console.log({ Error: "something went wrong - " + error.message });
      res.status(500).send("something went wrong : " + error.message);
    };
  
  });
module.exports = router;