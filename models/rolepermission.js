"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Permission, {
        foreignKey: "permission_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "permissionDetail",
      });
      this.belongsTo(models.Role, {
        foreignKey: "role_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "roleDetail",
      });      
    }
  }
  RolePermission.getRolePermission = async function getRolePermission(query, scopesArray = null) {
    return await RolePermission.scope(scopesArray).findOne({
      where: {
        ...query,
      },
    });
  };
  RolePermission.assignRolePermission = async function assignRole(data) {
    return await RolePermission.create(data);
  };
  RolePermission.revokeRolePermission = async function revokeRole(query) {
    return await RolePermission.destroy({
      where: {
        ...query,
      },
    });
  };
  RolePermission.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'id',
          as : 'permission_id',
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
          as: 'role_id'
        }
      },
      role_id: DataTypes.INTEGER,
      permission_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RolePermission",
    }
  );
  return RolePermission;
};
