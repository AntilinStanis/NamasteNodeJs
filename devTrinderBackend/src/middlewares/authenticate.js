const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {

  try {
    const { token } = req.cookies;

    if (token) {
      let decodedToken;

      try {
        decodedToken = await jwt.verify(token, 'mysecretkey');

      } catch (error) { return res.status(401).send("Invalid or expired token. Please log in again."); }

      if (decodedToken?.id) {

        const user = await User.findById(decodedToken?.id, '_id firstName');

        if (user) req.user = user;
        else throw new Error("Unauthorized. User not found.!");

      } else throw new Error("Token is Invalid ! please login again.!");

    } else throw new Error("Authentication token missing. Please log in.!");

    next();
  } catch (error) {
    res.status(400).send("something went wrong : " + error.message);
  };
};

module.exports = { authenticate };