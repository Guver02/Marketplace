const { Sequelize ,DataTypes, Model } = require('sequelize');
const { PRODUCT_CATEGORIES_TABLE } = require('./productcategories.model');
const { PRODUCT_IMAGES_TABLE } = require('./productimages.models');
const { USERS_TABLE } = require('./users.model');

const PRODUCTS_TABLE = 'products'

const schemaProductsSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,

    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    providerid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}

class Products extends Model {
    static associate(models) {
        this.belongsTo(models[USERS_TABLE], {
            foreignKey: 'providerid',
            as: 'myProviders'
        })

        this.belongsToMany(models.categories, {
            through: models[PRODUCT_CATEGORIES_TABLE],
            as: 'myCategories',
        });

        this.hasMany(models[PRODUCT_IMAGES_TABLE], {
            foreignKey: 'productid',
            as: 'images',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: PRODUCTS_TABLE
        }
    }
}

module.exports = { PRODUCTS_TABLE, Products, schemaProductsSeq }