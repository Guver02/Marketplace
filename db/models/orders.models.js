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
    },
    status: {
        type: Sequelize.ENUM(
            'pending',
            'paid',
            'processing',
            'shipped',
            'in_transit',
            'delivered',
            'returned',
            'refunded',
            'cancelled',
            'failed'
        ),
        allowNull: false,
        defaultValue: 'pending'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    }
};

class Orders extends Model {
    static associate(models) {
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: ORDERS_TABLE,
        };
    }
}

module.exports = { ORDERS_TABLE, Orders, schemaOrdersSeq };
