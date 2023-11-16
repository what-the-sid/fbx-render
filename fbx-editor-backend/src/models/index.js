const path = require('path');
const basename = path.basename(__filename);

const { importModule } = require('../helpers')

module.exports = (sequelize, Sequelize) => {
	const db = {}

	importModule(__dirname,'.model.js',basename).forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize);
		db[model.name] = model;
	});

	return db
}
