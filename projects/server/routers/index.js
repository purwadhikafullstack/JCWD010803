const userRouter = require("./user-router");
const tenantRouter = require("./tenant-router");
const propertyRouter = require("./properties-routers");
const transactionRouter = require("./transaction-router");
const orderRouter = require("./order-router");
const roomRouter = require("./room-router");
const specialPriceRouter = require('./special-price-router')

module.exports = {
  userRouter,
  propertyRouter,
  transactionRouter,
  tenantRouter,
  propertyRouter,
  orderRouter,
  roomRouter,
  specialPriceRouter
};
