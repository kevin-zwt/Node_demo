const { Role, Permission, UserRole, RolePermission } = require("../models");
const { checkUserRoleExist, checkRolePermissionExist } = require("../services/role-permission.service");
const { withErrorHandling } = require("../utils/try-catch");
const { authValidation } = require("../validation");

let resJSon;

const saveRole = withErrorHandling(async (req, res) => {
  await authValidation.saveRoleSchema.validateAsync({...req.body, ...req.params}, {
    abortEarly: false,
  });
  const savedRole = await Role.storeRole(
    req.body,
    parseInt(req.params.roleId)
  );
  resJSon = {
    data: savedRole,
    status: 200,
    message: "Role saved successfully!",
  };
  res.promise(resJSon);
});
  
const getRole = withErrorHandling(async (req, res) => {
  const { roleId } = req.params;
  if (roleId) {
    const getRole = await Role.getRole({
      ["id"]: roleId,
    }, ['withPermission']);
    resJSon = {
      data: getRole,
      status: 200,
      message: "Data fetched successfully!",
    };
  } else {
    const getAllRole = await Role.getAll(['withPermission']);
		resJSon = {
      data: getAllRole,
      status: 200,
      message: "Data fetched successfully!",
    };
  }
	res.promise(resJSon);
});

const removeRole = withErrorHandling(async (req, res) => {
  const { roleId } = req.params;
  await authValidation.removeRoleSchema.validateAsync({...req.params}, {
    abortEarly: false,
  });
  const count = await Role.destroyRole({
      ["id"]: roleId
  });
  resJSon = {
    status: count?200:500,
    message: count?"Data deleted successfully!":"Something went wrong!",
  };
	res.promise(resJSon);
});

const savePermission = withErrorHandling(async (req, res) => {
  await authValidation.savePermissionSchema.validateAsync({...req.body, ...req.params}, {
    abortEarly: false,
  });
  const savedPermission = await Permission.storePermission(
    req.body,
    parseInt(req.params.permissionId)
  );
  resJSon = {
    data: savedPermission,
    status: 200,
    message: "Permission saved successfully!",
  };
  res.promise(resJSon);
});

const getPermission = withErrorHandling(async (req, res) => {
  const { permissionId } = req.params;
  if (permissionId) {
    const permissionObj = await Permission.getPermission({
      ["id"]: permissionId,
    }, null );
    resJSon = {
      data: permissionObj,
      status: 200,
      message: "Data fetched successfully!",
    };
  } else {
    const permissionObj = await Permission.getAll();
		resJSon = {
      data: permissionObj,
      status: 200,
      message: "Data fetched successfully!",
    };
  }
	res.promise(resJSon);
});

const removePermission = withErrorHandling(async (req, res) => {
  const { permissionId } = req.params;
  await authValidation.removePermissionSchema.validateAsync({...req.params}, {
    abortEarly: false,
  });
  const count = await Permission.destroyPermission({
      ["id"]: permissionId
  });
  resJSon = {
    status: count?200:500,
    message: count?"Data deleted successfully!":"Something went wrong!",
  };
	res.promise(resJSon);
});

const assignRoleToUser = withErrorHandling(async (req, res) => {
  const { user_id, role_id } = req.body;
  await authValidation.assignRevokeUserRoleSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  await checkUserRoleExist(role_id, user_id);
  const assignedRole = await UserRole.assignRole({
    user_id, role_id
  });
  resJSon = {
    data: assignedRole,
    status: 200,
    message: "Role assigned to user successfully!",
  };
	res.promise(resJSon);
});

const revokeRoleToUser = withErrorHandling(async (req, res) => {
  const { user_id, role_id } = req.body;
  await authValidation.assignRevokeUserRoleSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  await checkUserRoleExist(role_id, user_id, true);
  const count = await UserRole.revokeRole({
    ["user_id"]: user_id,
    ["role_id"]: role_id
  });
  resJSon = {
    status: count?200:500,
    message: count?"Role revoked successfully!":"Something went wrong!",
  };
	res.promise(resJSon);
});

const assignPermissionToRole = withErrorHandling(async (req, res) => {
  const { role_id, permission_id } = req.body;
  await authValidation.assignRevokeRolePermissionSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  await checkRolePermissionExist(role_id, permission_id);
  const assignedPermission = await RolePermission.assignRolePermission({
    permission_id, role_id
  });
  resJSon = {
    data: assignedPermission,
    status: 200,
    message: "Permission added to role successfully!",
  };
	res.promise(resJSon);
});

const revokePermissionToRole = withErrorHandling(async (req, res) => {
  const { role_id, permission_id } = req.body;
  await authValidation.assignRevokeRolePermissionSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  await checkRolePermissionExist(role_id, permission_id, true);
  const count = await RolePermission.revokeRolePermission({
    ["permission_id"]: permission_id,
    ["role_id"]: role_id
  });
  resJSon = {
    status: count?200:500,
    message: count?"Permission revoked successfully!":"Something went wrong!",
  };
	res.promise(resJSon);
});

module.exports = {
  saveRole,
	getRole,
  removeRole,
  getPermission,
  savePermission,
  removePermission,
  assignRoleToUser,
  revokeRoleToUser,
  assignPermissionToRole,
  revokePermissionToRole
};
