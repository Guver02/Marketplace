const config = require('./../configuration/config')
const axios = require('axios')
const {Sequelize} = require ('sequelize');

//const setupModles= require('./models/index')
const setupModels = require('./models/index.js')
console.log(config.uriLink)
const sequelize = new Sequelize(
  config.dbName,
  config.dbUser, 
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false, 
      }
});

sequelize.authenticate().then( (e) =>{console.log('conectado con sequelize')}).catch(e=>{console.log(e)})



setupModels(sequelize);
//sequelize.sync()

module.exports = sequelize;

/**
 * axios.get('https://fakestoreapi.com/products')
  .then(response => {
    let dataVal = []

    response.data.map((elem) => {
      
      dataVal.push({
        product: elem.title,
        details: elem.description,
        price: elem.price,
        rating: elem.rating.rate,
        image: elem.image,
        quantity: elem.rating.count,
        providerid: 1,
        
      })
    })

    
    sequelize.models.products.bulkCreate(dataVal)
.then(() => {
  console.log('Registros creados exitosamente.');
})
.catch(error => {
  console.log('Error al crear registros: ', error);
});

  })
  .catch(error => {
    console.log(error);
  });

 */