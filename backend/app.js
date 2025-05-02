const express = require("express");
const bodyParser = require("body-parser");

const Post = require("./models/post"); // Import the Post model

const app = express();

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
  console.log(post);
  res.status(201).json({
    message: "Post added successfully!",
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "aaa123",
      title: "First serve-side post",
      content: "This is coming from the server",
    },
    {
      id: "bbb123",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

module.exports = app;
