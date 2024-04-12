'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: 'rolepermissions',
        foreignKey : 'permission_id',
        otherKey: 'role_id',
        timestamps: false
      })
    }
  }
  Permission.getPermission = async function getPermission(query, scopesArray = null) {
    return await Permission.scope(scopesArray).findOne({
      where: {
        ...query,
      },
    });
  };
  Permission.getAll = async function getAll(scopesArray = null) {
    return await Permission.scope(scopesArray).findAll();
  };
  Permission.storePermission = async function storePermission(data, permissionId = 0) {
    let permissionObj;
    if (permissionId === 0) {
      permissionObj = await Permission.create(data);
    } else {
      permissionObj = await Permission.getPermission({
        ["id"]: permissionId,
      });
      await permissionObj.set(data);
      await permissionObj.save();
    }
    return permissionObj.toJSON();
  };
  Permission.destroyPermission = async function destroyPermission(query) {
    return await Permission.destroy({
      where: {
        ...query,
      },
    });
  };
  Permission.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};