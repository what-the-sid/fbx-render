const {parseBinary,fbxUint8Array,parseText} = require('fbx-parser');
const fs = require('fs');

module.exports = (filePath) => {
  const fbxData = fs.readFileSync(filePath);

  try {
    let parsedData
    try {
      parsedData = parseBinary(fbxData)
    } catch (e) {
      parsedData = parseText(fbxData)
    }

    // Check if the parsed data contains nodes
    // console.log(JSON.stringify(parsedData))
    if (!parsedData) {
      throw new Error('Failed to parse the FBX file.');
    }

    // Find the first object with scale and position properties
    const objects = parsedData.find((item) => item.name === 'Objects');
    let foundNode = null;
    for (const node of objects.nodes) {
      if (node.name === 'Model') {
        console.log(JSON.stringify(node))
        // Check if the Model node has scale and position properties
        const scaleProperty = node.nodes.find((prop) => prop.name === 'Lcl Scaling');
        const positionProperty = node.nodes.find((prop) => prop.name === 'Lcl Translation');

        if (scaleProperty && positionProperty) {
          foundNode = node;
          break;
        }
      }
    }

    console.log(foundNode)
    // for (const obj of parsedData.elements.Objects) {
    //   if (obj.PropertyTemplate && obj.PropertyTemplate.Properties) {
    //     const scaleProperty = obj.PropertyTemplate.Properties.find(
    //       (prop) => prop.PropertyName === 'Lcl Scaling'
    //     );
    //     const positionProperty = obj.PropertyTemplate.Properties.find(
    //       (prop) => prop.PropertyName === 'Lcl Translation'
    //     );
    //
    //     if (scaleProperty && positionProperty) {
    //       foundObject = obj;
    //       break;
    //     }
    //   }
    // }

    if (!foundObject) {
      throw new Error('No object with scale and position properties found.');
    }

    const scale = foundObject.PropertyTemplate.Properties.find(
      (prop) => prop.PropertyName === 'Lcl Scaling'
    ).Value;
    const position = foundObject.PropertyTemplate.Properties.find(
      (prop) => prop.PropertyName === 'Lcl Translation'
    ).Value;

    return {
      scale,
      position,
    }
  } catch (error) {
    console.error('Error reading FBX file:', error.message);
    return null;
  }
}
