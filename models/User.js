const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: { type: String, maxlength: 50 },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: { type: String },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", async function (next) {
  //비밀번호를 암호화 시킨다.
  let user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (err) {
    return Promise.reject(err);
  }
};

userSchema.methods.generateToken = async function () {
  // 토큰 생성
  let user = this;
  user.token = jwt.sign(user._id.toHexString(), "secretToken");
  try {
    await user.save();
    return user;
  } catch (err) {
    return Promise.reject(err);
  }
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
