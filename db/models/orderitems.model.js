const { Sequelize, DataTypes, Model } = require('sequelize');

const ORDER_ITEMS = 'order_items';

const schemaOrderItems = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    orderid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id',
        },
    },
    productid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unitprice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
};

class OrderItems extends Model {
    static associate(models) {
        this.belongsTo(models.orders, {
            foreignKey: 'orderid',
            as: 'order',
        });
        this.belongsTo(models.products, {
            foreignKey: 'productid',
            as: 'product',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: ORDER_ITEMS,
            tableName: ORDER_ITEMS,
            timestamps: false,
        };
    }
}

module.exports = { ORDER_ITEMS, OrderItems, schemaOrderItems };
