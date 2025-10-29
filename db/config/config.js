const appConfig = require('../../configuration/config');

module.exports = {
    development: {
        username: appConfig.dbUser,
        password: appConfig.dbPassword,
        database: appConfig.dbName,
        host: appConfig.dbHost,
        port: appConfig.dbPort,
        dialect: 'mysql'
    },
    test: {
        username: appConfig.dbUser,
        password: appConfig.dbPassword,
        database: `${appConfig.dbName}_test`,
        host: appConfig.dbHost,
        port: appConfig.dbPort,
        dialect: 'mysql'
    },
    production: {
        username: appConfig.dbUser,
        password: appConfig.dbPassword,
        database: appConfig.dbName,
        host: appConfig.dbHost,
        port: appConfig.dbPort,
        dialect: 'mysql'
    }
};
