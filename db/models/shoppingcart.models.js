const { Sequelize, DataTypes, Model } = require('sequelize');
const {PRODUCTS_TABLE} = require('./products.models')

const SHOPPING_CART_TABLE = 'shoppingcart';

const shoppingCartSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    /*references: {
        model: PRODUCTS_TABLE,
        key: 'id'
    }*/
  },
  createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  productid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,

    references: {
        model: PRODUCTS_TABLE,
        key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  }
};

class ShoppingCart extends Model {
  static associate(models) {
    this.belongsTo(models.products, {
      foreignKey: 'productid',
      as: 'productInCart',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: SHOPPING_CART_TABLE,
    };
  }
}

module.exports = {
  SHOPPING_CART_TABLE,
  ShoppingCart,
  shoppingCartSchema,
};
