const { Sequelize, DataTypes, Model } = require('sequelize');

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
};

class User extends Model {
    static associate(models) {
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