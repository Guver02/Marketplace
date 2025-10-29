'use strict';
const bcrypt = require('bcrypt');
const appConfig = require('../../configuration/config');
const { USERS_TABLE } = require('../models/users.model');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(USERS_TABLE, [{
      username: 'superadmin',
      email: 'superadmin@example.com',
      password: await bcrypt.hash(appConfig.adminPassword, 10),
      userip: '127.0.0.1',
      role: 'admin',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'superadmin@example.com' }, {});
  }
};
