const { Sequelize, DataTypes, Model } = require('sequelize');
const { USERS_TABLE } = require('./users.model');

const ADMIN_TABLE = 'admin';

const schemaAdminSeq = {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    job_title: DataTypes.STRING,
    access_level: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'low',
    },
    notes: DataTypes.TEXT,

};

class Admin extends Model {
    static associate(models) {
        this.belongsTo(models[USERS_TABLE], {
            foreignKey: 'user_id',
            as: 'myUser',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: ADMIN_TABLE,
        };
    }
}

module.exports = { ADMIN_TABLE, Admin, schemaAdminSeq };
