const { User } = require("../models/User");

let auth = async (req, res, next) => {
  let token = req.cookies.x_auth;
  try {
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ isAuth: false, error: err.message });
  }
};

module.exports = { auth };
