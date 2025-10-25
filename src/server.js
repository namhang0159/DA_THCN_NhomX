// require("dotenv").config();
// const express = require("express"); //commonjs
// const configViewEngine = require("./config/viewEngine");
// const apiRoutes = require("./routes/api");
// const connection = require("./config/database");
// const { getHomepage } = require("./controllers/homeController");
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 8888;

// app.use(cors());
// //config req.body
// app.use(express.json()); // for json
// app.use(express.urlencoded({ extended: true })); // for form data

// //config template engine
// configViewEngine(app);

// //khai báo route
// app.use("/v1/api/", apiRoutes);
// app.use("/", getHomepage);

// (async () => {
//   try {
//     //using mongoose
//     // await connection();

//     app.listen(port, () => {
//       console.log(`Backend Nodejs App listening on port ${port}`);
//     });
//   } catch (error) {
//     console.log(">>> Error connect to DB: ", error);
//   }
// })();

// require("dotenv").config();
// const express = require("express");
// const configViewEngine = require("./config/viewEngine");
// const apiRoutes = require("./routes/api");
// const connection = require("./config/database"); // hàm connection
// const cors = require("cors");
// const sequelize = require("./config/database");
// const app = express();
// const port = process.env.PORT || 8888;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// configViewEngine(app);

// app.use("/v1/api/", apiRoutes);
// // app.use("/", getHomepage);

// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//     app.listen(port, () => {
//       console.log(`Backend Nodejs App listening on port ${port}`);
//     });
//   } catch (error) {
//     console.log(">>> Error connect to DB: ", error);
//   }
// })();
const express = require("express");
const cors = require("cors");
const connection = require("./config/database");
const configViewEngine = require("./config/viewEngine");
const sequelize = require("./config/database");
const port = process.env.PORT || 8888;
const apiRoutes = require("./routes/api");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
app.use("/v1/api/", apiRoutes);
(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(port, () => {
      console.log("Server đang chạy PORT", port);
    });
  } catch (error) {
    console.log("Lỗi connect DB :", error);
  }
})();
