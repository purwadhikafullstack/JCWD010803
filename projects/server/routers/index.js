const userRouter = require("./user-router");
const propertyRouter = require('./properties-routers')
const tenantRouter = require("./tenant-router");

module.exports = {
  userRouter,
  tenantRouter,
  propertyRouter,
};
