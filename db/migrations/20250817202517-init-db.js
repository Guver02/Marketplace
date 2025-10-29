'use strict';

const { PRODUCTS_TABLE, schemaProductsSeq } = require('../models/products.models');
const { USERS_TABLE, schemaUsersSeq } = require('../models/users.model');
const { CATEGORIES_TABLE, schemaCategoriesSeq } = require('../models/categories.model');
const { PRODUCT_CATEGORIES_TABLE, schemaProductCategoriesSeq } = require('../models/productcategories.model');
const { RECOMENDATIONSLEVEL_TABLE, schemaRecomendationsLevelSeq } = require('../models/recomendationslevel.models');
const { SHOPPING_CART_TABLE, shoppingCartSchema } = require('../models/shoppingcart.models');
const { ORDERS_TABLE, schemaOrdersSeq } = require('../models/orders.models');
const { ORDER_ITEMS, schemaOrderItems } = require('../models/orderitems.model');
const { PRODUCT_IMAGES_TABLE, schemaProductImagesSeq } = require('../models/productimages.models');       

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USERS_TABLE, schemaUsersSeq)
    await queryInterface.createTable(PRODUCTS_TABLE, schemaProductsSeq)
    
    await queryInterface.createTable(CATEGORIES_TABLE, schemaCategoriesSeq)
    await queryInterface.createTable(PRODUCT_CATEGORIES_TABLE, schemaProductCategoriesSeq)
    await queryInterface.createTable(RECOMENDATIONSLEVEL_TABLE, schemaRecomendationsLevelSeq)
    await queryInterface.createTable(SHOPPING_CART_TABLE, shoppingCartSchema)
    await queryInterface.createTable(ORDERS_TABLE, schemaOrdersSeq)
    await queryInterface.createTable(ORDER_ITEMS, schemaOrderItems)
    await queryInterface.createTable(PRODUCT_IMAGES_TABLE, schemaProductImagesSeq)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USERS_TABLE)
    await queryInterface.dropTable(PRODUCTS_TABLE)
    await queryInterface.dropTable(CATEGORIES_TABLE)
    await queryInterface.dropTable(PRODUCT_CATEGORIES_TABLE)
    await queryInterface.dropTable(RECOMENDATIONSLEVEL_TABLE)
    await queryInterface.dropTable(SHOPPING_CART_TABLE)
    await queryInterface.dropTable(ORDERS_TABLE)
    await queryInterface.dropTable(ORDER_ITEMS)
    await queryInterface.dropTable(PRODUCT_IMAGES_TABLE)
  }
};
