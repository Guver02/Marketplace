const {Sequelize ,DataTypes, Model} = require('sequelize')

const RECOMENDATIONSLEVEL_TABLE = 'recomendationslevel'

const schemaRecomendationsLevelSeq = {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }

class RecomendationsLevel extends Model{

    static associate(models)
    {
        this.belongsTo(models.products, {
            foreignKey: 'id',
            as: 'myProducts'
        })
    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: RECOMENDATIONSLEVEL_TABLE
        }
    }
} 

module.exports = {RECOMENDATIONSLEVEL_TABLE ,RecomendationsLevel, schemaRecomendationsLevelSeq}