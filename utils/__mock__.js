const { createPassword } = require("./auth");

const prefix = "/api";

const getRoles = () => {
  const roles = [
		{
			name: 'Admin',
		},{
			name: 'Employee',
		},{
			name: 'Company',
		}
	];
  return roles;
};
const getPermissions = () => {
  const permissions = [
    {
      name: `${prefix}/company/:companyId?`,
      type: "back",
    },
    {
      name: `${prefix}/company/:cmpId?`,
      type: "back",
    },
    {
      name: `${prefix}/employee/:empId`,
      type: "back",
    },
    {
      name: `${prefix}/employee/:empId?`,
      type: "back",
    },
    {
      name: `${prefix}/login`,
      type: "back",
    },
    {
      name: `${prefix}/register`,
      type: "back",
    },
  ];
  return permissions;
};
const getUsers = async () => {
  const users = [
    {
      username: "Admin",
      email: "admin@mailinator.com",
      password: await createPassword("Admin", 10),
    }
  ];
  return users;
};
const getUserRoles = (userId, roleId) => {
  const userRoles = [
    {
      user_id: userId,
      role_id: roleId,
    }
  ];
  return userRoles;
};
const getRolesPermissions = (roleId, permissionId) => {
  const rolePermission = [
		{
			role_id: roleId,
			permission_id: permissionId
		}
	]
  return rolePermission;
};
module.exports = {
  prefix,
  getRoles,
  getPermissions,
  getUsers,
  getUserRoles,
  getRolesPermissions,
};
