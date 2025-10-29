const { Products, schemaProductsSeq} = require('./products.models')
const { RecomendationsLevel, schemaRecomendationsLevelSeq} = require('./recomendationslevel.models')
const { ShoppingCart, shoppingCartSchema} = require('./shoppingcart.models')
const { Orders, schemaOrdersSeq} = require('./orders.models')

const { ProductCategories, schemaProductCategoriesSeq } = require('./productcategories.model')
const { Categories, schemaCategoriesSeq } = require('./categories.model')

const { User, schemaUsersSeq} = require('./users.model')
const { ProductImages, schemaProductImagesSeq } = require('./productimages.models.js')
const {OrderItems, schemaOrderItems} = require('./orderitems.model.js')

function setupModels(sequelize) {
    User.init(schemaUsersSeq, User.config(sequelize))
    Products.init(schemaProductsSeq,Products.config(sequelize))
    RecomendationsLevel.init(schemaRecomendationsLevelSeq,RecomendationsLevel.config(sequelize) )
    ShoppingCart.init(shoppingCartSchema, ShoppingCart.config(sequelize))
    Orders.init(schemaOrdersSeq, Orders.config(sequelize))
    OrderItems.init(schemaOrderItems, OrderItems.config(sequelize))
    ProductCategories.init(schemaProductCategoriesSeq, ProductCategories.config(sequelize))
    Categories.init(schemaCategoriesSeq, Categories.config(sequelize))
    ProductImages.init(schemaProductImagesSeq, ProductImages.config(sequelize))    

    Products.associate(sequelize.models)
    RecomendationsLevel.associate(sequelize.models)
    Orders.associate(sequelize.models)
    OrderItems.associate(sequelize.models)
    ProductCategories.associate(sequelize.models)
    Categories.associate(sequelize.models)
    ShoppingCart.associate(sequelize.models)
}

module.exports = setupModels