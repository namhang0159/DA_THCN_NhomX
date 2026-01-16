require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  setTimeout(() => {
    const white_list = ["/", "/register", "/login"];
    if (white_list.find((item) => "/v1/api" + item === req.originalUrl)) {
      next();
    } else {
      if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
          req.user.exp = decoded.exp;
          next();
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            return res.status(401).json("Token hết hạn");
          }
          return res.status(401).json("Token không hợp lệ");
        }
      } else {
        next();
      }
    }
  }, 100);
};

module.exports = auth;
