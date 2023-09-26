const userRouter = require("./user-router");
const tenantRouter = require('./tenant-router')
const propertyRouter = require('./properties-routers')
const orderRouter = require('./order-router')
const roomRouter = require('./room-router')

module.exports = {
  userRouter,
  propertyRouter,
  tenantRouter,
  orderRouter,
  roomRouter
};

