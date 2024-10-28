const express = require("express");
const app = express();
const port = 3001;

const { User } = require("./models/User");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
  try {
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ success: false, err: err });
  }
});

app.post("/login", async (req, res) => {
  try {
    //db에서 메일 찾기
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //메일이 있다면 비번 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch)
      return res.status(401).json({ loginSuccess: false, message: "비번이 틀렸습니다." });

    const userToken = await user.generateToken();
    await res
      .cookie("x_auth", userToken.token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
