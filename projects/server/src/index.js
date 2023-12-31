const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// require("dotenv/config")
const {
  userRouter,
  propertyRouter,
  roomRouter,
  orderRouter,
  transactionRouter,
  tenantRouter,
  specialPriceRouter,
} = require("./routers");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const schedule = require("node-schedule");
const autoComplete = require("./scheduler/auto-complete");
const OtpAutoClear = require("./scheduler/auto-otp-clear");
const emailScheduler = require("./scheduler/email-scheduler");
const db = require("./models");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/tenant", tenantRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/order", orderRouter);
app.use("/api/specialPrice", specialPriceRouter);

schedule.scheduleJob("1 1 10 * * *", autoComplete);
schedule.scheduleJob("1 1 10 * * *", OtpAutoClear);
emailScheduler()

app.use("/", express.static(__dirname + "./public"));

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true }); 
    console.log(`APP RUNNING at ${PORT}✅`);
  }
});
