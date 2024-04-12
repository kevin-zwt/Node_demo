"use strict";

const {
  getPermissions,
  getRoles,
  getUsers,
  getUserRoles,
  getRolesPermissions,
} = require("../utils/__mock__.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const roles = await queryInterface.bulkInsert("Roles", getRoles(), {});
    const permissions = await queryInterface.bulkInsert(
      "Permissions",
      getPermissions(),
      {}
    );
    const users = await queryInterface.bulkInsert(
      "Users",
      await getUsers(),
      {}
    );
    await queryInterface.bulkInsert(
      "UserRoles",
      getUserRoles(users, roles),
      {}
    );
    await queryInterface.bulkInsert(
      "RolePermissions",
      getRolesPermissions(roles, permissions),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {} );
     */
    await queryInterface.bulkDelete("Roles", null, {});
    await queryInterface.bulkDelete("Permissions", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("UserRoles", null, {});
    await queryInterface.bulkDelete("RolePermissions", null, {});
  },
};
