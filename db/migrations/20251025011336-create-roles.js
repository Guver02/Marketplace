'use strict';

const { schemaAdminSeq, ADMIN_TABLE } = require('../models/admin.model');
const { CUSTOMER_TABLE, schemaCustomerSeq } = require('../models/customer.model');
const { ROLES_TABLE, schemaRolesSeq } = require('../models/roles.model');
const { SELLER_TABLE, schemaSellerSeq } = require('../models/seller.model');
const { USER_ROLES_TABLE, schemaUserRolesSeq } = require('../models/userroles.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_ROLES_TABLE, schemaUserRolesSeq)
    await queryInterface.createTable(ROLES_TABLE, schemaRolesSeq)

    await queryInterface.createTable(CUSTOMER_TABLE, schemaCustomerSeq)
    await queryInterface.createTable(SELLER_TABLE, schemaSellerSeq)
    await queryInterface.createTable(ADMIN_TABLE, schemaAdminSeq)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_ROLES_TABLE)
    await queryInterface.dropTable(ROLES_TABLE)

    await queryInterface.dropTable(CUSTOMER_TABLE)
    await queryInterface.dropTable(SELLER_TABLE)
    await queryInterface.dropTable(ADMIN_TABLE)
  }
};
