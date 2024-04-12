'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'otp', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
          after: 'password' 
        }, { transaction: t }),
        queryInterface.addColumn('users', 'otp_expire', {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          after: 'otp' 
        }, { transaction: t })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'otp', { transaction: t }),
        queryInterface.removeColumn('users', 'otp_expire', { transaction: t }),
      ]);
    });
  }
};
