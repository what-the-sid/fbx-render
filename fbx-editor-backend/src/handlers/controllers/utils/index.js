const { dirname } = require('path');

const errorResponse = (message,statusCode,res) => {
	return res.status(statusCode).json({
		error: true,
		message: message
	});
}

const extractJSON = (text) => {
  try {
    // Define a regular expression pattern to match JSON objects
    const jsonPattern = /{[^}]*}/g;

    // Use the regular expression to find JSON objects in the text
    const jsonMatches = text.match(jsonPattern);

    // If JSON objects are found, parse and return them
    if (jsonMatches && jsonMatches.length > 0) {
      const extractedJson = jsonMatches.map((match) => JSON.parse(match));
      return extractedJson;
    }

    // If no JSON objects are found, return an empty array
    return [];
  } catch (error) {
    console.error('Error extracting JSON from text:', error.message);
    return [];
  }
}

const exportArgs = (payload,filePath) => {
	const outputPath = process.cwd()+'/output/' + payload.filename.replace(".fbx",".glb");
	const scale = payload.scale;
	const position = payload.position;
	const subdivide = payload.subdivide;
	const unsubdivide = payload.unsubdivide;

	const arg = [filePath,outputPath,`--scale`,...scale.map(e=>e.toString()),`--position`,...position.map(e=>e.toString())]
	if(subdivide){
		arg.push(`--subdivide`)
		arg.push(payload.subdivide)
	}
	else if (unsubdivide) {
		arg.push("--unsubdivide")
		arg.push(payload.unsubdivide)
	}
	return arg
}

module.exports = {
	errorResponse,
	extractJSON,
	exportArgs
}
