const { Sequelize, DataTypes, Model } = require('sequelize');

const PRODUCTS_PURCHASE_TABLE = 'productspurchase';

const schemaProductsPurchaseSeq = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  purchaseid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'previouspurchases',
      key: 'id',
    },
  },
};

class ProductsPurchase extends Model {
  static associate(models) {
    this.belongsTo(models.products, {
      foreignKey: 'productid',
      as: 'product',
    });
    this.belongsTo(models.previouspurchases, {
      foreignKey: 'purchaseid',
      as: 'purchase',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: PRODUCTS_PURCHASE_TABLE,
    };
  }
}

module.exports = { PRODUCTS_PURCHASE_TABLE, ProductsPurchase, schemaProductsPurchaseSeq };
