require("dotenv").config();
const jwt = require("jsonwebtoken");
const authAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json("Thiếu token");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json("Token hết hạn");
    }
    return res.status(401).json("Token không hợp lệ");
  }
};

module.exports = authAdmin;
