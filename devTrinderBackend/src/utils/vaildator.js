const validator = require('validator');

const validateSignUpAPI = (req) => {
  const { firstName, emailId, password } = req.body;

  if(!firstName && !firstName.length > 4) throw new Error('enter the vaild first Name');

  if(!validator.isEmail(emailId)) throw new Error('Enter the vaild emailId');

  if(!validator.isStrongPassword(password)) throw new Error('Please enter the strong Password...!');


};

const validateUpdateData = (req) => {

  const userDatas = ['age', 'firstName', 'lastName', 'about', 'photoUrl', 'skills'];

  Object.keys(req.body).forEach((key) => {
    if (!userDatas.includes(key)) {
      throw new Error('Invalid Update data - ' + key);
    };

    if(key === 'photoUrl') if(!validator.isURL(req.body.photoUrl)) throw new Error('Enter the vaild Url');
    
  });

};

module.exports = {validateSignUpAPI,validateUpdateData};