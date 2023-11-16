const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const app = express();
const { appConfig } = require('./config')

const isProduction = appConfig.get('/env')==='production'?true:false
const srcDir = isProduction?'./build':'./src'

app.use(cors());
app.use(bodyParser.json())

const folderPath = path.join(__dirname, 'output');

app.use(
	/**
 	* Format response with same object
 	* @param {*} req
 	* @param {*} res
 	* @param {*} next
 	*/
	function (req, res, next) {
		res.sendformat = (data, code = 200) => {
			return res.status(code).json({ code, ...data, status_code:code });
		};
		next();
	}
);

require(`${srcDir}/routes`)().then(route=>{
	app.use('/v1/',route)
});

app.get('/v1/output/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(folderPath, filename);

    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

const server = app.listen( Number(appConfig.get('/port')) || 4000,
	function(){
		console.log('🚀App listening on port ' + server.address().port);
	}
);
