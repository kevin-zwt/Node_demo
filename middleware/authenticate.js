const { getUser, getUserRoles } = require("../services/user.service");
const { decodeAuthToken } = require("../utils/auth");
const authRouter = require("../routes/auth.routes");

const PUBLIC_PATH = ["/", "/api", "/api/"];
const setAuthRoute = async () => {
  return authRouter.stack.map((stack) =>
    PUBLIC_PATH.push(`/api/auth${stack.route.path}`)
  );
};
const verifyToken = async (req, res, next) => {
  await setAuthRoute();
  if (PUBLIC_PATH.findIndex((e) => e === req.originalUrl) >= 0) return next();
  const token = req.header("Authorization");
  if (!token) return res.promise({ status: 401, error: "Access denied" });
  try {
    const decoded = await decodeAuthToken(req);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.promise({ status: 401, error: "Invalid token" });
  }
};

const can = async (req, res, next) => {
  if (!req.userId) return next();
  const user = await getUserRoles(req.userId);
  if (user.Roles && user.Roles.length > 0) {
    const userPermissions = user.Roles.map((role) => role.Permissions)[0];
    if (userPermissions.length > 0) {
      const userPermissionList = userPermissions.map(
        (permission) => permission.name
      );
      req.userPermissionList = userPermissionList;
      next();
    } else {
      res.promise({ status: 403, error: "Forbidden error!" });
    }
  } else {
    res.promise({ status: 403, error: "Forbidden error!" });
  }
};

const checkPermission = async (req, res, next) => {
  const reqUrl = req.baseUrl + req.route.path;
  if (req.userPermissionList.length > 0) {
    if (req.userPermissionList.findIndex((e) => e === reqUrl) >= 0) {
      return next();
    } else {
      res.promise({ status: 403, error: "Forbidden error!" });
    }
  } else {
    res.promise({ status: 403, error: "Forbidden error!" });
  }
};

module.exports = {
  verifyToken,
  PUBLIC_PATH,
  can,
  checkPermission,
  setAuthRoute,
};
