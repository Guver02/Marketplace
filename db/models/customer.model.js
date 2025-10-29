const { Sequelize, DataTypes, Model } = require('sequelize');
const { USERS_TABLE } = require('./users.model');

const CUSTOMER_TABLE = 'customer';

const schemaCustomerSeq = {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    address: {type: DataTypes.TEXT},
    phone_number: {type: DataTypes.STRING},
    date_of_birth: {type:DataTypes.DATE},
    loyalty_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
};

class Customer extends Model {
    static associate(models) {
        this.belongsTo(models[USERS_TABLE], {
            foreignKey: 'user_id',
            as: 'myUser',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: CUSTOMER_TABLE,
        };
    }
}

module.exports = { CUSTOMER_TABLE, Customer, schemaCustomerSeq };
