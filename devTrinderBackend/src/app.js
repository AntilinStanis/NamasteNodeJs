const express = require("express");
const app = express();
const { authenticate } = require("../middlewares/authenticate");
const connectionDB = require("../config/database");
const User = require("../models/user");
const {validateSignUpAPI} = require('../utils/vaildator');
var cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res) => {


  try {

    validateSignUpAPI(req);
    const {firstName,secondName,emailId,password,age} = req.body;

    let passwordHash = await bcrypt.hash(password, 10);
    const user = new User({firstName,secondName,emailId,password:passwordHash,age});

    await user.save();
    res.send("User saved success fully");
  } catch (error) {
    res.status(500).send("something went wrong " + error.message);
  }
});


// login API
app.post("/login", async (req, res) => {

  try {
    let isCorrectPassword;
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId }, 'password _id');

    if (user) {

      isCorrectPassword = await user.comparePassword(password);

      if (isCorrectPassword) {
        const token = await user.getJWT();
        
        res.cookie('token', token, { expires: new Date(Date.now() +  7 * 24 * 60 * 60 * 1000), httpOnly: true });
            
        res.send('Login successfull');
      }
      else throw new Error('incorrect password!!! please enter the correct password');

    } else throw new Error('User doest not exits!!! please create a new account.....!!');


  } catch (error) {
    res.status(500).send("Error : " + error.message);
  };
});

app.post('/sendConnectionReq', authenticate, async (req, res) => {

  try {
    const user = req.user.firstName;
    res.send(user + " - sends the connection request");
  } catch (error) {
    res.status(500).send("Error : " + error.message);
  };

});

app.get("/profile", async (req, res) => {

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
    res.status(500).send("something went wrong : " + error.message);
  };

});

app.get("/user",authenticate, async (req, res) => {
  console.log("user",req.user._id);
  
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (user) res.send(user);
    else res.status(404).send("user not found");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/userId", async (req, res) => {
  try {
    const user = await User.findById(req?.body?.id);

    if (user) res.send(user);
    else res.status(404).send("User not found");
  } catch (error) {
    console.log({
      INFO: "Error while fetching the user by Id -" + error.message,
    });

    res.status(500).send("something went wrong");
  }
});

app.delete("/userId", async (req, res) => {
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
// update
// findByIdAndUpdate has three input aruguments
// 1st is _id , 2nd is the data to update, 3rd options object
app.patch("/:userId", async (req, res) => {
  let statusCode = 500;
  console.log({ INFO: "update user API called" });

  try {
    const allowedUpdateFields = [
      "skills",
      "age",
      "firstName",
      "secondName",
      "photoUrl",
    ];

    const isAllowed = Object.keys(req.body).every((key) => {
      console.log({ key: key });

      return allowedUpdateFields.includes(key);
    });

    if (!isAllowed) {
      statusCode = 400;
      throw new Error("Enter the valid update fields!");
    }

    if (req.body?.skills.length < 5) {
      statusCode = 400;
      throw new Error("Maximum skills should be five");
    }

    // const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body, { returnDocument: 'after' });
    // const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body,{lean:true});
    // const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body,{includeResultMetadata:true});
    const user = await User.findByIdAndUpdate(req?.params?.userId, req?.body, {
      runValidators: true,
      returnDocument: "after",
    });

    if (user) res.send(user);
    else res.status(404).send("User not found");
  } catch (error) {
    console.log({ INFO: "Error while updating user by Id -" + error.message });

    res.status(statusCode).send("something went wrong - " + error.message);
  }
});

app.patch('/userEmail', async (req, res) => {

    try {
        const user = await User.findOneAndUpdate({ emailId: req?.body?.emailId }, req?.body, { returnDocument: 'after' });

        if (user) res.send(user);

        else res.status(404).send("User not found");
    } catch (error) {
        console.log({ INFO: "Error while updating user by email -" + error.message });

        res.status(500).send("something went wrong");
    };
});

app.use('/', (req, res, next) => {
    // res.send("vanakam da mapla server la irrunthu....");
    console.log("nan than da first response uh....");

    next();
    // res.send("Ithu 2nd response da mapla");
  },
  (req, res, next) => {
    res.send("Ithu 2nd response da mapla");
    next();
  }
);

app.use("/", (err, req, res, next) => {
  console.log({ ERROR: err.message });

  res.status(500).send("sorry da mapla server la error");
});

connectionDB()
  .then(() => {
    console.log({ INFO: "Database connected successfully........!" });
    app.listen(3000, () => {
      console.log("My application is running successfully");
    });
  })
  .catch((error) => {
    console.error({ INFO: "Error in database connection -" + error.message });
  });
