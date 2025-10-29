const {env} = require('../configuration/config.js')
const config = require('../db/config/config.js')[env]
const {Sequelize} = require ('sequelize');

const setupModels = require('./models/index.js')
const sequelize = new Sequelize(
  config.database,
  config.username, 
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false, 
      }
});

sequelize.authenticate()
.then( e => { console.log(`Sequelize conectado, entorno: ${env}`) })
.catch( e => { console.log(e) })

setupModels(sequelize);

module.exports = sequelize;
