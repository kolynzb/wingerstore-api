const jwt = require("jsonwebtoken");

const defaultOptions = {
  expiresIn: process.env.JWT_LIFETIME,
};
const createToken = ({ payload, options }) => {
  return jwt.sign(payload, {
    ...defaultOptions,
    ...options,
  });
};
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

const sendCookieResponse = ({ res, statusCode, user, options }) => {
  const token = createToken({ payload: user, options });
  res.cookie();
  res.status(statusCode).json({ user, token });
};

modules.exports = { createToken, verifyToken, sendCookieResponse };
