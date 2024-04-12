"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.RolePermission, {
      //   foreignKey: 'role_id',
      //   as: 'permissions',
      // });
      this.belongsToMany(models.User, {
        through: "userroles",
        foreignKey: "role_id",
        otherKey: "user_id",
        timestamps: false,
      });
      this.belongsToMany(models.Permission, {
        through: "rolepermissions",
        foreignKey: "role_id",
        otherKey: "permission_id",
        timestamps: false,
      });
      Role.addScope("withPermission", {
        include: [
          {
            model: models.Permission,
            attributes: ["name", "type"],
            required: false,
            through: {
              attributes: [],
            },
          },
        ],
      });
    }
  }

  Role.getRole = async function getRole(query, scopesArray = null) {
    return await Role.scope(scopesArray).findOne({
      where: {
        ...query,
      },
    });
  };
  Role.destroyRole = async function destroyRole(query) {
    return await Role.destroy({
      where: {
        ...query,
      },
    });
  };
  Role.getAll = async function getAll(scopesArray = null) {
    return await Role.scope(scopesArray).findAll();
  };
  Role.storeRole = async function storeRole(data, roleId = 0) {
    let roleObj;
    if (roleId === 0) {
      roleObj = await Role.create(data);
    } else {
      roleObj = await Role.getRole({
        ["id"]: roleId,
      });
      await roleObj.set(data);
      await roleObj.save();
    }
    return roleObj.toJSON();
  };
 
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
