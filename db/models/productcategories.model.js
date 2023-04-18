const { Sequelize, DataTypes, Model } = require('sequelize');

const PRODUCT_CATEGORIES_TABLE = 'productcategories';

const schemaProductCategoriesSeq = {
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
  categoryid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
};

class ProductCategories extends Model {
  static associate(models) {
    this.belongsTo(models.products, {
      foreignKey: 'productid',
      as: 'product',
    });
    this.belongsTo(models.categories, {
      foreignKey: 'categoryid',
      as: 'category',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: PRODUCT_CATEGORIES_TABLE,
    };
  }
}

module.exports = { PRODUCT_CATEGORIES_TABLE, ProductCategories, schemaProductCategoriesSeq };
