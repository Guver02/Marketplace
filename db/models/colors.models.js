const { Sequelize, DataTypes, Model } = require('sequelize');

const COLORS_TABLE = 'colors';

const schemaColorSeq = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hex_code: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
};

class Color extends Model {
  static associate(models) {
    // Aquí se pueden definir las asociaciones con otros modelos de Sequelize
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: COLORS_TABLE,
    };
  }
}

module.exports = { COLORS_TABLE, Color, schemaColorSeq };
