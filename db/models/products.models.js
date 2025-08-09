const { DataTypes, Model } = require('sequelize')

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
        type: DataTypes.INTEGER,

        allowNull: false,

        references: {
            model: 'providers',
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
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
        default: '',
    },
}

class Products extends Model {

    static associate(models) {
        this.belongsTo(models.providers, {
            foreignKey: 'providerid',
            as: 'myProviders'
        })

        this.belongsToMany(models.categories, {
            through: models.productcategories,
            as: 'myCategories',
        });

        this.belongsToMany(models.colors, {
            through: models.productcolors,
            as: 'myColors',
        });

        this.hasMany(models.productimages, {
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