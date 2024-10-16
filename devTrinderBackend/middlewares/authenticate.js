const authenticate = (req,res,next)=>{

  console.log({INFO:"The user is successfully authenticated..."});
  next();
};

module.exports={authenticate};