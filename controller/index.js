const companyController = require("./company");
const employeeController = require("./employee");
const authController = require("./auth");
const userController = require('./user');
const rolePermissionController = require('./role-permission')

module.exports = {
  companyController,
  employeeController,
  authController,
  userController,
  rolePermissionController
};
