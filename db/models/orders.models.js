const { Sequelize, DataTypes, Model } = require('sequelize');

const ORDERS_TABLE = 'orders';

const schemaOrdersSeq = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
    /*references: {
      model: 'users',
      key: 'id',
    },*/
  },
  status: {
    type: DataTypes.STRING(250),
    allowNull: false,
    defaultValue: 'sin enviar'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
};

class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.products, {
      foreignKey: 'productid',
      as: 'myProduct',
    });
/*this.belongsTo(models.products, {
      foreignKey: 'productid',
      as: 'product',
    });*/
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: ORDERS_TABLE,
    };
  }
}

module.exports = { ORDERS_TABLE, Orders, schemaOrdersSeq };
