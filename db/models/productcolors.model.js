const { Sequelize, DataTypes, Model } = require('sequelize');
const { PRODUCTS_TABLE } = require('./products.models');
const { COLORS_TABLE } = require('./colors.models');

const PRODUCT_COLORS_TABLE = 'productcolors';

const schemaProductColorsSeq = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCTS_TABLE,
      key: 'id',
    },
  },
  colorid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: COLORS_TABLE,
      key: 'id',
    },
  },
};

class ProductColors extends Model {
  static associate(models) {
    this.belongsTo(models.products, {
      foreignKey: 'productid',
      as: 'product',
    });

    this.belongsTo(models.colors, {
      foreignKey: 'colorid',
      as: 'color',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: PRODUCT_COLORS_TABLE,
    };
  }
}

module.exports = {
  PRODUCT_COLORS_TABLE,
  ProductColors,
  schemaProductColorsSeq,
};
