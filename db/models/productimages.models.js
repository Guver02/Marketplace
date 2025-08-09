const {DataTypes, Model } = require('sequelize');

const PRODUCT_IMAGES_TABLE = 'productimages';

const schemaProductImagesSeq = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  productid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  imageurl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

class ProductImages extends Model {
  static associate(models) {
    this.belongsTo(models.products, {
      foreignKey: 'productid',
      as: 'product',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: PRODUCT_IMAGES_TABLE,
      tableName: PRODUCT_IMAGES_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  PRODUCT_IMAGES_TABLE,
  ProductImages,
  schemaProductImagesSeq,
};
