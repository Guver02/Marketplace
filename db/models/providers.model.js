const { Sequelize, DataTypes, Model } = require('sequelize');

const PROVIDERS_TABLE = 'providers';

const schemaProvidersSeq = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      /*references: {
        model: 'users',
        key: 'id',
      },*/
    },
    ubicationlat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ubicationlng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  };

class Provider extends Model {
  static associate(models) {
    this.hasMany(models.products, {
      foreignKey: 'providerid',
      as: 'products',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: PROVIDERS_TABLE,
    };
  }
}

module.exports = { Provider, schemaProvidersSeq, PROVIDERS_TABLE };
