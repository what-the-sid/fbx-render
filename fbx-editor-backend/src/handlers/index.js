const database = require('../../database')

const renderHandler = require('./render.handler')(database)

module.exports = {
	renderHandler
}
