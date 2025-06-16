const express = require('express');
const router = express.Router();
const User = require("../models/user");
const ConnectionRequest = require('../models/connectionRequest');

const { authenticate } = require("../middlewares/authenticate");

router.post('/:status/:userId', authenticate, async (req, res) => {

  try {
    if (req?.params?.status && req?.params?.userId && req?.user?._id) {  
      const user = await User.findOne({ _id: req?.params?.userId });

      if(!user) throw new Error("User does not exsits");

      const requestAlreadyExits = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: req.user._id, toUserId: req.params.userId },
          { fromUserId: req.params.userId, toUserId: req.user._id },
        ],
      });
      console.log(requestAlreadyExits);
      
      if(requestAlreadyExits)throw new Error("Connection Request already exists!");
      const connectionRequest = new ConnectionRequest({ status: req.params.status, fromUserId: req.user._id, toUserId: req.params.userId });
      const connectionRequestStatus = await connectionRequest.save();
      
       res.json({INFO : `The ${req?.params?.status} request has been send from id : ${req?.user?._id} to id: ${req?.params?.userId} `});
    } else throw new Error('Something went wrong');

  } catch (error) {
    res.status(500).json({ Error: error.message });
  };

});

router.post('/request/review/:status/:requestId',authenticate,async(req,res)=>{
  console.log({INFO : "Accept Connection Request function Called"});
  
  try {
    
    const loggedInUser = req.user;

    const { status, requestId } = req?.params;

    const allowedStatus = ["accepted","rejected"];

    if (!allowedStatus.includes(status)) {
      throw new Error('Status not allowed');
    };
    
    const connectionRequest = await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:'interested'
    });
    if(!connectionRequest) throw new Error('Connection request not found!');
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    console.log("connectionRequest",connectionRequest);
    console.log({INFO: "Accept Connection request function success"});
    
    res.status(200).json({ConnectionRequest: data});    
  } catch (error) {
    console.error({Error: `Accept Connection request function failed with message : ${error.message} `});
    
    res.status(500).json({Error:error.message})
  };

});

module.exports = router;