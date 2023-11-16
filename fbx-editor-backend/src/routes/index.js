const router = require('express').Router();

const path = require('path');
const basename = path.basename(__filename);

const { importModule } = require('../helpers')

module.exports = async () => {
	importModule(__dirname,'.route.js',basename).forEach((file) => {
		const route = require(path.join(__dirname, file));
		router.use(route.path,route.router)
	});

	return router
}
