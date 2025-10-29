const { Sequelize, DataTypes, Model } = require('sequelize');
const { ROLES_TABLE } = require('./roles.model');
const { USER_ROLES_TABLE } = require('./userroles.model');
const { CUSTOMER_TABLE } = require('./customer.model');

const USERS_TABLE = 'users';

const schemaUsersSeq = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    userip: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    role: {
        type: Sequelize.ENUM('customer','seller','admin'),
        allowNull: false,
        defaultValue: 'customer'
    }

};

class User extends Model {
    static associate(models) {
        this.belongsToMany(models[ROLES_TABLE], {
            through: models[USER_ROLES_TABLE],
            foreignKey: 'user_id'
        })

        this.hasOne(models[CUSTOMER_TABLE], {foreignKey: 'user_id'})
        this.hasOne(models[SELLER_TABLE], {foreignKey: 'user_id'})
        this.hasOne(models[ADMIN_TABLE], {foreignKey: 'user_id'})
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: USERS_TABLE,
            tableName: USERS_TABLE,
            timestamps: false,
        };
    }
}

module.exports = { User, schemaUsersSeq, USERS_TABLE };