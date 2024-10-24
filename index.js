const express = require("express");
const app = express();
const port = 3001;

const { User } = require("./models/User");
const config = require("./config/key");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongoDB connected!!!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  //회원 가입 시 필요한 정보를 클라이언트에서
  //가져오면 db에 넣기

  const user = new User(req.body);
  await user
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.json({ success: false, err: err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
