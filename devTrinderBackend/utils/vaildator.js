const validator = require('validator');

const validateSignUpAPI = (req) => {
  const { firstName, emailId, password } = req.body;

  if(!firstName && !firstName.length > 4) throw new Error('enter the vaild first Name');

  if(!validator.isEmail(emailId)) throw new Error('Enter the vaild emailId');

  if(!validator.isStrongPassword(password)) throw new Error('Please enter the strong Password...!');


};

module.exports = {validateSignUpAPI};