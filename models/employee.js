'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Company, {
        foreignKey: 'companyId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'companyDetails',
      })
    }
  }
  Employee.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salary: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};