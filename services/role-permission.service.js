const { Op } = require("sequelize");
const { UserRole, Role, Permission, RolePermission } = require("../models");
const Joi = require("joi");
const { findUserByKey } = require("./user.service");

const checkUserRoleExist = async (role_id, user_id, isCheck = false) => {
  const roleExist = await UserRole.getUserRole({
    ["role_id"]: role_id,
    ["user_id"]: user_id
  });
  if (isCheck?!roleExist:roleExist) {
    throw new Joi.ValidationError(
      "number.role_id",
      [
        {
          message: isCheck?"User with role not found!":"User already have role! please try another role!",
          path: ["role_id"],
          type: "number.role_id",
          context: {
            key: "role_id",
            label: "role_id",
            role_id,
          },
        },
      ],
      role_id
    );
  }
};
const checkUserIdExist = async (user_id) => {
  const user = await findUserByKey({
    ["id"]: user_id,
  });
  if (!user) {
    throw new Joi.ValidationError(
      "number.user_id",
      [
        {
          message: "User not exist!",
          path: ["user_id"],
          type: "number.user_id",
          context: {
            key: "user_id",
            label: "user_id",
            user_id,
          },
        },
      ],
      user_id
    );
  }
};
const checkRoleExist = async (role_id) => {
  const role = await Role.getRole({
    ["id"]: role_id,
  });
  if (!role) {
    throw new Joi.ValidationError(
      "number.role_id",
      [
        {
          message: "Role not exist!",
          path: ["role_id"],
          type: "number.role_id",
          context: {
            key: "role_id",
            label: "role_id",
            role_id,
          },
        },
      ],
      role_id
    );
  }
};
const checkPermissionExist = async(permission_id) => {
  const permission = await Permission.getPermission({
    ["id"]: permission_id,
  });
  if (!permission) {
    throw new Joi.ValidationError(
      "number.permission_id",
      [
        {
          message: "Permission not exist!",
          path: ["permission_id"],
          type: "number.permission_id",
          context: {
            key: "permission_id",
            label: "permission_id",
            permission_id,
          },
        },
      ],
      permission_id
    );
  }
};
const checkRolePermissionExist = async (role_id, permission_id, isCheck = false) => {
  const rolePermissionExist = await RolePermission.getRolePermission({
    ["role_id"]: role_id,
    ["permission_id"]: permission_id
  });
  if (isCheck?!rolePermissionExist:rolePermissionExist) {
    throw new Joi.ValidationError(
      "number.role_id",
      [
        {
          message: isCheck?"Role with Permission not found!":"Role already have Permission! please try another permission!",
          path: ["role_id"],
          type: "number.role_id",
          context: {
            key: "role_id",
            label: "role_id",
            role_id,
          },
        },
      ],
      role_id
    );
  }
};

module.exports = {
  checkUserRoleExist,
  checkUserIdExist,
  checkRoleExist,
  checkPermissionExist,
  checkRolePermissionExist
};
