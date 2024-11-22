const express = require('express');
const router = express.Router();

const { authenticate } = require("../middlewares/authenticate");

router.post('/sendConnectionReq', authenticate, async (req, res) => {

    try {
      const user = req.user.firstName;
      res.send(user + " - sends the connection request");
    } catch (error) {
      res.status(500).send("Error : " + error.message);
    };
  
  });

module.exports = router;