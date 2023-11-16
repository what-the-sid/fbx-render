'use strict'

module.exports = (sequelize, Sequelize) => {
	const { DataTypes, NOW } = Sequelize
	const Renders = sequelize.define('Renders', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		fileName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		position:{
			type: DataTypes.STRING,
			allowNull: false
		},
		scale:{
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue:NOW
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue:NOW
		}
	});
	return Renders;
};
