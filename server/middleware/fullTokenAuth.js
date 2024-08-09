const asyncWrapper = require("./asyncWrapper");
const { verifyToken } = require("../utility/jwt");

const verifyAuthentication = asyncWrapper((req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) throw new Error("Token not found.");
  const isValid = verifyToken(token);
  if (isValid && isValid.success == true) {
    req.payload = isValid.payload;
    next();
  } else {
    throw new Error("unauthorized token");
  }
});

module.exports = { verifyAuthentication };
