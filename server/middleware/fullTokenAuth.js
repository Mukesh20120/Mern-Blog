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

const verifyIsAdmin = asyncWrapper((req, res, next) => {
  if (req.payload && req.payload.isAdmin) {
    console.log("inside verify if statement");
    next();
  } else {
    throw new Error("You are not authorize to access this api");
  }
  console.log("outside if statement");
});

module.exports = { verifyAuthentication, verifyIsAdmin };
