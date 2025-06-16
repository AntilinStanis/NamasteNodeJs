const express = require('express');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');

const {authenticate} = require('../middlewares/authenticate');

//  when a user logged in inside the devTinder this api gives all the pending requests
userRouter.get("/user/requests/received", authenticate, async (req, res) => {

    try {

        const loggedInUser = req.user;

        const pendingRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",["firstName","secondName","photoUrl","age"]);

      //  Populate just like adding include in sequelize and in second array we need to pass the required attributes
      //  if we did'nt passed any attributes it joins all the data in the joined table  

        res.status(200).json({ message: "Pending requests fetched successfully !", data: pendingRequests })

    } catch (error) {
        res.status(500).json({ Error: `Internal Server error - ${error.message}` });
    };

});


module.exports = userRouter;