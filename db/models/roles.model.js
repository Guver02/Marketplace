const { Sequelize, DataTypes, Model } = require('sequelize');
const { USERS_TABLE } = require('./users.model');
const { USER_ROLES_TABLE } = require('./userroles.model');

const ROLES_TABLE = 'roles';

const schemaRolesSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
        type: DataTypes.ENUM('customer', 'seller', 'admin'),
        unique: true,
        allowNull: false,
    },

};

class Roles extends Model {
    static associate(models) {
        this.belongsToMany(models[USERS_TABLE], {
            through: models[USER_ROLES_TABLE],
            foreignKey: 'role_id'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: ROLES_TABLE,
        };
    }
}

module.exports = { ROLES_TABLE, Roles, schemaRolesSeq };
