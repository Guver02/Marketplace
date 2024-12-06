//EXPORTACION DENUESTROS MODELOS
const { Products, schemaProductsSeq} = require('./products.models')
const { RecomendationsLevel, schemaRecomendationsLevelSeq} = require('./recomendationslevel.models')
const { ShoppingCart, shoppingCartSchema} = require('./shoppingcart.models')
const { Orders, schemaOrdersSeq} = require('./orders.models')
const { PreviousPurchases, schemaPreviousPurchasesSeq} = require('./previouspurchases.model')
const { ProductsPurchase, schemaProductsPurchaseSeq} = require('./productspurchase.model.js')
const { Provider, schemaProvidersSeq } = require('./providers.model')
const { ProductCategories, schemaProductCategoriesSeq } = require('./productcategories.model')
const { Categories, schemaCategoriesSeq } = require('./categories.model')
const { Color, schemaColorSeq } = require('./colors.models')
const { ProductColors, schemaProductColorsSeq } = require('./productcolors.model')
//const { Notify, schemaNotifySeq} = require('./notifyModel')


// INICIACION DE MODELOS PARA EXPORTAR
function setupModels(sequelize) {

    Products.init(schemaProductsSeq,Products.config(sequelize) )
    RecomendationsLevel.init(schemaRecomendationsLevelSeq,RecomendationsLevel.config(sequelize) )
    ShoppingCart.init(shoppingCartSchema, ShoppingCart.config(sequelize))
    Orders.init(schemaOrdersSeq, Orders.config(sequelize))
    PreviousPurchases.init(schemaPreviousPurchasesSeq, PreviousPurchases.config(sequelize))
    ProductsPurchase.init(schemaProductsPurchaseSeq, ProductsPurchase.config(sequelize))
    Provider.init(schemaProvidersSeq, Provider.config(sequelize))
    ProductCategories.init(schemaProductCategoriesSeq, ProductCategories.config(sequelize))
    Categories.init(schemaCategoriesSeq, Categories.config(sequelize))
    Color.init(schemaColorSeq, Color.config(sequelize))
    ProductColors.init(schemaProductColorsSeq, ProductColors.config(sequelize))

    Products.associate(sequelize.models)
    RecomendationsLevel.associate(sequelize.models)
    ProductsPurchase.associate(sequelize.models)
    Orders.associate(sequelize.models)
    ProductCategories.associate(sequelize.models)
    Categories.associate(sequelize.models)
    Color.associate(sequelize.models)
    ProductColors.associate(sequelize.models)
}


module.exports = setupModels