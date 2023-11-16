const Confidence = require('confidence')
const path = require('path');

//App Configuration in confidence store

const config = {
	$meta: 'This file defines all AWS configurations for this project.',
	port:{
		$env: 'APP_PORT',
		$default: 4000,
	},
	env:{
		$env: 'NODE_ENV',
		$default: 'development',
	},
	database:{
		name:{
			$env: 'DB_NAME',
			$default: 'data.test.sqlite',
		},
		username:{
			$env: 'DB_USERNAME',
			$default: null,
		},
		password:{
			$env: 'DB_PASS',
			$default: null,
		},
		dialect:{
			$env: 'DB_DIALECT',
			$default: 'sqlite',
		},
		storage:{
			$env: 'DB_STORAGE',
			$default: path.join(__dirname,'../data.test.sqlite'),
		}
	}
}

// Initialize Confidence Store
const store = new Confidence.Store(config)
const criteria = {
	env: process.env['NODE_ENV'],
}

module.exports = {
	get: (key) => store.get(key, criteria),
	meta: (key) => store.meta(key, criteria)
}
