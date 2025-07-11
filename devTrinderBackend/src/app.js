const express = require("express");
const app = express();
const cors = require('cors');
const connectionDB = require("./config/database");
const User = require("./models/user");
var cookieParser = require('cookie-parser');


const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require("./routes/user");
const mailRouter = require("./routes/mail");

app.use(cors({
    origin:"http://localhost:5173",
    // origin:'http://localhost:4200',
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());



// Module Routers
app.use('/',mailRouter);
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);





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

connectionDB()
  .then(() => {
    console.log({ INFO: "Database connected successfully. :) !" });
    app.listen(3000, () => {
      console.log({ INFO: "DevTinder is running successfully. :)" });
    });
  })
  .catch((error) => {
    console.error({ INFO: "Error in database connection -" + error.message });
  });
