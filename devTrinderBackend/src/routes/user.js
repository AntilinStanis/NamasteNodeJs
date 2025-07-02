const express = require('express');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

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

// get all connections for the logged in user

userRouter.get("/user/connections/all", authenticate, async (req, res) => {
    console.log({Info: "get all connection function called."});
    
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ]
        }).populate("fromUserId", ["firstName", "secondName","photoUrl"]).populate("toUserId", ["firstName", "secondName","photoUrl"]);

         const data = connections.map((row)=> row.fromUserId._id.toString() === loggedInUser._id.toString() ? row.toUserId  : row.fromUserId);    
             
        res.status(200).json({ data: data, message: "Connections fetched Successfully!" });

    } catch (error) {
        res.status(500).json({ Error: `Internal Server error - ${error.message}` })
    };
});


userRouter.get('/user/feed',authenticate, async (req,res)=>{
    try {

        const loggedInUser = req.user._id;

        const hideUsers = await ConnectionRequest.find({
            $or:[
                {toUserId : loggedInUser},
                {fromUserId:loggedInUser}
            ]
        }).select("fromUserId toUserId");

        const hideUsersSet = new Set();

        hideUsers.forEach((row)=>{

            hideUsersSet.add(row.fromUserId);
            hideUsersSet.add(row.toUserId);

        });

             
       const users = await User.find({
        $and:[
           {_id: {$nin : Array.from(hideUsersSet)}},
           {_id : {$ne : loggedInUser }}
        ]
       }).select("_id firstName secondName age skills age gender about photoUrl");
        
      res.status(200).json({ message: "Profiles fetched successfully", users: users });


        
    } catch (error) {

        res.status(500).json({Error:`Internal Server Error - ${error.message}`});
        
    };
});

module.exports = userRouter;