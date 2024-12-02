const express = require('express');
const router = express.Router();
const ConnectionRequest = require('../models/connectionRequest');

const { authenticate } = require("../middlewares/authenticate");

router.post('/:status/:userId', authenticate, async (req, res) => {

  try {
    if (req?.params?.status && req?.params?.userId && req?.user?._id) {
      const connectionRequest = new ConnectionRequest({ status: req.params.status, fromUserId: req.user._id, toUserId: req.params.userId });
      const connectionRequestStatus = await connectionRequest.save();
      
       res.json({INFO : `The ${req?.params?.status} request has been send from id : ${req?.user?._id} to id: ${req?.params?.userId} `});
    } else throw new Error('Something went wrong');

  } catch (error) {
    res.status(500).json({ Error: error.message });
  };

});

module.exports = router;