'use strict'

const Sequelize = require('sequelize');
const { appConfig } = require('./config/');

/**
 * Initialize Sequelize object
 * @date 26/09/2023 - 12:42:12
 *
 * @type {*}
 */
const sequelize = new Sequelize(appConfig.get('/database/name'),
	appConfig.get('/database/username'),
	appConfig.get('/database/password'), {
		dialect: appConfig.get('/database/dialect'),
		storage: appConfig.get('/database/storage'),
		define: {
			timestamp: true
		}
	}
);

// Connect all the models/tables in the database to a db object,
let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const models = require('./src/models')(sequelize,Sequelize)
db = {...db,...models}

module.exports = db;
