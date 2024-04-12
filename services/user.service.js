const { Op } = require("sequelize");
const { User, Role, Permission } = require("../models");
const Joi = require("joi");

const checkEmailExist = async (email) => {
  const user = await findUserByKey({
    ["email"]: email,
  });
  if (user) {
    throw new Joi.ValidationError(
      "string.email",
      [
        {
          message: "Email Exist! please try another email!",
          path: ["email"],
          type: "string.email",
          context: {
            key: "email",
            label: "email",
            email,
          },
        },
      ],
      email
    );
  }
};
const checkUserExist = async (email) => {
  const user = await findUserByKey({
    ["email"]: email,
  });
  if (!user) {
    throw new Joi.ValidationError(
      "string.email",
      [
        {
          message: "Email not exist!",
          path: ["email"],
          type: "string.email",
          context: {
            key: "email",
            label: "email",
            email,
          },
        },
      ],
      email
    );
  } else {
    return user;
  }
};
const checkValidOTP = async (otp) => {
  const user = await findUserByKey({
    ["otp"]: otp,
    ["otp_expire"]: { [Op.gt]: new Date() },
  });
  if (!user) {
    throw new Joi.ValidationError(
      "string.otp",
      [
        {
          message: "Invalid or expired OTP!",
          path: ["otp"],
          type: "string.otp",
          context: {
            key: "otp",
            label: "otp",
            otp,
          },
        },
      ],
      otp
    );
  }else{
    return user;
  }
};
const getUser = async (userId) => {
  return await User.findByPk(userId);
};
const findUserByKey = async (query) => {
  return await User.findOne({
    where: {
      ...query,
    },
  });
};

const saveUser = async (data, searchTerm, user = {}) => {
  let userObj;
  if (searchTerm === 0) {
    userObj = await User.create(data);
  } else {
    userObj = user;
    await userObj.set(data);
    await userObj.save();
  }
  return userObj.toJSON();
};

const getUserRoles = async (userId) => {
  return await User.findByPk(userId, {
    attributes: [],
    include: [
      {
        model: Role,
        attributes: ["name", "description"],
        through: {
          attributes: [],
        },
        required: true,
        include: [
          {
            model: Permission,
            attributes: ["name"],
            where: {
              type: "back",
            },
            required: false,
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });
};

const getUserWithRolesPermissions = async (userId) => {
  return await User.findByPk(userId, {
    include: [
      {
        model: Role,
        attributes: ["name", "description"],
        through: {
          attributes: [],
        },
        required: true,
        include: [
          {
            model: Permission,
            attributes: ["name", "description"],
            where: {
              type: "back",
            },
            required: false,
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });
};
module.exports = {
  getUser,
  saveUser,
  findUserByKey,
  getUserRoles,
  getUserWithRolesPermissions,
  checkEmailExist,
  checkUserExist,
  checkValidOTP,
};
