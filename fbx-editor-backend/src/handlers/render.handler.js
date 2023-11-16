const Controller = require('./controllers/render.controller')

const metadata = {
	script: 'render.handler',
	description:'Wrapper for Render model'
}

module.exports = (...args) => {
	return new Controller(metadata,...args)
}
