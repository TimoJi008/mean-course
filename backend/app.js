const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts"); // Import the posts routes

const app = express();

mongoose
  .connect(
    "mongodb+srv://timoji008:RQOjCE3Hi76z75PR@cluster0.jxdkrrn.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json()); // Parse JSON data from incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/favicon.ico", (req, res) => res.status(204)); // Ignore favicon requests and prevents from loading twice

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
