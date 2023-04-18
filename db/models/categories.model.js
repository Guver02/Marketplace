const { Sequelize, DataTypes, Model } = require('sequelize');

const CATEGORIES_TABLE = 'categories';

const schemaCategoriesSeq = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  category: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
 
};

class Categories extends Model {
  static associate(models) {
    this.belongsToMany(models.products, {
      through: models.productcategories,
      as: 'myProduct',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: CATEGORIES_TABLE,
    };
  }
}

module.exports = { CATEGORIES_TABLE, Categories, schemaCategoriesSeq };
