const express = require("express");
const ErrorHandler = require("./middlewares/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const dotenv = require("dotenv");
// require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const order = require("./controller/order");
const payment = require("./controller/payment");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/order", order);
app.use("/api/v2/payment", payment);
 const conversation = require("./controller/conversation");
 const message = require("./controller/message");

app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
 app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
// respond with "hello world" when a GET request is made to the homepage

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
