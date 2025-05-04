const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post"); // Import the Post model

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save(); // Save the post to the database
  res.status(201).json({
    message: "Post added successfully!",
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find() // Fetch all posts from the database
    .then((documents) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents,
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
