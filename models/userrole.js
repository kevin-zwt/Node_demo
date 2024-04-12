'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'userDetail',
      });
      this.belongsTo(models.Role, {
        foreignKey: 'role_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'roleDetail',
      });
    }
  }
  UserRole.getUserRole = async function getUserRole(query, scopesArray = null) {
    return await UserRole.scope(scopesArray).findOne({
      where: {
        ...query,
      },
    });
  };
  UserRole.assignRole = async function assignRole(data) {
    return await UserRole.create(data);
  };
  UserRole.revokeRole = async function revokeRole(query) {
    return await UserRole.destroy({
      where: {
        ...query,
      },
    });
  };
  UserRole.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as : 'user_id',
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
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};