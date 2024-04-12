const employee = require("./employee.routes");
const company = require("./company.routes");
const auth = require("./auth.routes");
const rolePermission = require("./role-permission.routes");
const { verifyToken, init, can } = require("../middleware");

module.exports = (app) => {
  app.prefix("/api", [init, verifyToken, can], function (appRoute) {
    appRoute.use("/employee", employee);
    appRoute.use("/company", company);
    appRoute.use("/auth", auth);
    appRoute.use("/role-permission", rolePermission);
  });
  app.use("*", (req, res, next) => {
    res.promise({ status: 404, data: "Route does not exists" });
  });
};

