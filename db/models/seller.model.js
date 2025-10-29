const { Sequelize, DataTypes, Model } = require('sequelize');
const { USERS_TABLE } = require('./users.model');

const SELLER_TABLE = 'seller';

const schemaSellerSeq = {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    store_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_description: DataTypes.TEXT,
    business_registration_number: DataTypes.STRING,
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    total_sales: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },

};

class Seller extends Model {
    static associate(models) {
        this.belongsTo(models[USERS_TABLE], {
            foreignKey: 'user_id',
            as: 'myUser',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: SELLER_TABLE,
        };
    }
}

module.exports = { SELLER_TABLE, Seller, schemaSellerSeq };
