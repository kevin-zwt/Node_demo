"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserRole, {
        foreignKey: "user_id",
        as: "roles",
      });
      this.belongsToMany(models.Role, {
        through: "userroles",
        foreignKey: "user_id",
        otherKey: "role_id",
        timestamps: false,
      });
    }
  }

  User.prototype.getWithoutPassword = async function getWithoutPassword(user) {
    await delete user.dataValues.password;
    return user;
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otp_expire: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {      
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
