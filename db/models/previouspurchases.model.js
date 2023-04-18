const { Sequelize, DataTypes, Model } = require('sequelize');

const PREVIOUS_PURCHASES_TABLE = 'previouspurchases';

const schemaPreviousPurchasesSeq = {
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
      model: 'users',
      key: 'id',
    },*/
  },
  createdat: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  completed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

class PreviousPurchases extends Model {
  static associate(models) {
    
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: PREVIOUS_PURCHASES_TABLE,
    };
  }
}

module.exports = { PREVIOUS_PURCHASES_TABLE, PreviousPurchases, schemaPreviousPurchasesSeq };
