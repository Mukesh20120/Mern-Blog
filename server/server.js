const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db/connect.js");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allErrorHandler = require("./middleware/allErrorHandling.js");
const notFound = require("./middleware/notFound.js");
const path = require("path");

const _dirPath = path.resolve();

// Routers
const authRouter = require("./routers/authRouter.js");
const userRouter = require("./routers/userRouter.js");
const postRouter = require("./routers/postRouter.js");
const commentRouter = require("./routers/commentRouter.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const url = process.env.URL;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("combined"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

app.use(allErrorHandler);
app.use(notFound);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(allErrorHandler);
app.use(notFound);

const start = async () => {
  try {
    await connect(url);
    app.listen(port, () => {
      console.log("db connect successfully...");
      console.log("Server is running...on port", port);
    });
  } catch (error) {
    console.log("Fail to start server", error.message);
  }
};

start();
