const userRouter = require("./user-router");
const tenantRouter = require('./tenant-router')
const propertyRouter = require('./properties-routers')
const orderRouter = require('./order-router')
module.exports = {
  userRouter,
  tenantRouter,
  propertyRouter,
  orderRouter
}
