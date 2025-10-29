const { Sequelize, DataTypes, Model } = require('sequelize');

const USER_ROLES_TABLE = 'user_roles';

const schemaUserRolesSeq = {
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    role_id: {
        type: DataTypes.INTEGER.UNSIGNED,
    },

};

class Roles extends Model {

    static config(sequelize) {
        return {
            sequelize,
            modelName: USER_ROLES_TABLE,
        };
    }
}

module.exports = { USER_ROLES_TABLE, Roles, schemaUserRolesSeq };
