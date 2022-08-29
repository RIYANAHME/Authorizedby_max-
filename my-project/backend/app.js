const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user"); // login
const app = express();

mongoose.connect("mongodb+srv://Aungkon:Aungkon.riyan@cluster0.mhhrgi5.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to Database");
})
.catch(() => {
  console.log("Connected failed!");
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res , next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
     //login token
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT , OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes); //login


module.exports = app;

