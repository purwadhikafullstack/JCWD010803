const userRouter = require("./user-router");
const tenantRouter = require('./tenant-router')
const propertyRouter = require('./properties-routers')
const roomRouter = require('./room-router')

module.exports = {
  userRouter,
  propertyRouter,
  tenantRouter,
  roomRouter
};

