//task.route.js
//Routes for CRUD in task table
const renderRouter = require('express').Router();
const { renderHandler } = require('../handlers')
const { asyncWrapper, storageModule } = require('../helpers')

const multer = require('multer');

const upload = multer({ storage:storageModule('/uploads') });

renderRouter.get('/getFile',asyncWrapper(renderHandler.fetchFile.bind(renderHandler)))
renderRouter.get('/getAll',asyncWrapper(renderHandler.fetchHistory.bind(renderHandler)))
renderRouter.post('/export',asyncWrapper(renderHandler.export.bind(renderHandler)))
renderRouter.post('/upload',upload.single('fbxFile'),asyncWrapper(renderHandler.upload.bind(renderHandler)))

module.exports = {
	path:'/render',
	router:renderRouter
};
