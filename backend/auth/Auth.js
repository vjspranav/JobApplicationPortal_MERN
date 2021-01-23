const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    //console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });
    const verified = jwt.verify(token, "JWT_TOKEN_SECRET");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = auth;
