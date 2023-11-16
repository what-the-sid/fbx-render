// const { metricsDAO } = require('../../dao')
const { errorResponse,extractJSON, exportArgs } = require('./utils')
const { fbxModule,executer } = require('../../helpers')


class RenderController {
	constructor(metadata, database){
		this.database = database
		this.metadata = metadata
	}

  async upload(req, res){

    const uploadedFilename = req.file.filename;

		const filePath = process.cwd()+'/uploads/' + uploadedFilename;
		const scriptPath = process.cwd()+'/render-scripts/' + "find_properties.py";

		const properties = extractJSON(await executer(scriptPath,[filePath]))[0]

		const modelData = {
			fileName: uploadedFilename,
			scale: JSON.stringify(properties.scale),
			position: JSON.stringify(properties.position)
		}

		const createRecord = await this.database.Renders.create(modelData).then((true)).catch((false))

		return res.status(200).json({
			error: false,
			message: 'Succesfully uploaded fbx file',
      filename: uploadedFilename,
			properties
		});

	}

	async export(req, res){

    const payload = req.body;
		const scriptPath = process.cwd()+'/render-scripts/' + "export.py";
		const filePath = process.cwd()+'/uploads/' + payload.filename;

		await executer(scriptPath,exportArgs(payload,filePath))

		return res.status(200).json({
			error: false,
			message: 'Succesfully created task',
			glbFile: payload.filename.replace(".fbx",".glb")
		});

	}

	async fetchFile(req, res){

		const params = req.query

		const getRecord = await this.database.Renders.findOne({
			where: { fileName:params.filename}
		}).catch(([]))

		if(getRecord instanceof Array){
			return errorResponse('Something went wrong',500, res)
		}

		return res.status(200).json({
			error: false,
			message: 'Succesfully fetched task',
			data: getRecord
		});

	}

	async fetchHistory(req, res){

		const getRecords = await this.database.Renders.findAll({
		}).catch(([]))

		return res.status(200).json({
			error: false,
			message: 'Succesfully fetched task',
			data: getRecords
		});

	}

}

module.exports = RenderController
