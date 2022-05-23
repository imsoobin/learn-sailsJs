const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .send("A token is required for authentication - Forbidden");
  }
  try {
    const decode = jwt.verify(token, "secretkey");
    // console.log(decode);
    req.user = decode;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
