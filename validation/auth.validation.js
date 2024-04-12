const Joi = require("joi");
const { checkEmailExist, checkUserExist, checkValidOTP } = require("../services/user.service");
const { checkUserIdExist, checkRoleExist, checkPermissionExist } = require("../services/role-permission.service");

const registerSchema = Joi.object().keys({
  username: Joi.string().required("User name Required"),
  email: Joi.string()
    .required("Email Required")
    .email()
    .external(checkEmailExist),
  password: Joi.string().required("Password Required"),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required("Confirm Password required!"),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().required("Email Required").email(),
  password: Joi.string().required("Password Required"),
});

const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .required("Email Required")
    .email()
    .external(checkUserExist),
});

const resetPasswordSchema = Joi.object().keys({
  otp: Joi.string().required("OTP Required").external(checkValidOTP),
  password: Joi.string().required("Password Required"),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required("Confirm Password required!"),
});

const saveRoleSchema = Joi.object().keys({
  name: Joi.string().when('roleId', {
    is: Joi.number().greater(0),
    then: Joi.forbidden(),
    otherwise: Joi.string().required("Name required")    
  }),
  description: Joi.string().optional().allow(""),
  roleId: Joi.number().optional(),
});

const removeRoleSchema = Joi.object().keys({
  roleId: Joi.number().required(),
});

const savePermissionSchema = Joi.object().keys({
  name: Joi.string().when('permissionId', {
    is: Joi.number().greater(0),
    // then: Joi.forbidden(),
    then: Joi.optional(),
    otherwise: Joi.string().required("Name required")
  }),
  type: Joi.string().when('permissionId', {
    is: Joi.number().greater(0),
    then: Joi.optional(),
    otherwise: Joi.string().required("Type required")
  }),
  description: Joi.string().optional().allow(""),
  permissionId: Joi.number().optional(),
});

const removePermissionSchema = Joi.object().keys({
  permissionId: Joi.number().required(),
});

const assignRevokeUserRoleSchema = Joi.object().keys({
  user_id: Joi.number().min(1).required().external(checkUserIdExist),
  role_id: Joi.number().min(1).required().external(checkRoleExist),
});

const assignRevokeRolePermissionSchema = Joi.object().keys({
  permission_id: Joi.number().min(1).required().external(checkPermissionExist),
  role_id: Joi.number().min(1).required().external(checkRoleExist),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  saveRoleSchema,
  removeRoleSchema,
  savePermissionSchema,
  removePermissionSchema,
  assignRevokeUserRoleSchema,
  assignRevokeRolePermissionSchema
};