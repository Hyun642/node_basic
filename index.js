const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://jjjangtoy7:gus125@boilerplate.62nhn.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate"
  )
  .then(() => console.log("mongoDB connected!!!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
