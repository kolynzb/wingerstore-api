const { createToken, verifyToken, sendCookieResponse } = require("./jwt");

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[0];
  if (token == null)
    return res.status(401).json({ status: 401, message: "Invalid token" });
  try {
    const valid = verifyToken(token);
    req.user = valid;
    next();
  } catch (err) {
    res.status(401).json({ status: 401, message: "Invalid token" });
    next(err);
  }
};

const checkUser = (req, res, next) => {
  req.user.id === req.params.id
    ? res.status(403).json("Unauthorized to access")
    : next();
};

module.exports = { authorizeUser, checkUser };
