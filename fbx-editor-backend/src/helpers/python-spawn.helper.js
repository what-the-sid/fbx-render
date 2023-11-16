const spawn = require('child-process-promise').spawn;

module.exports = async (scriptName,args) => {
  try {
    const pythonProcess = spawn('python3', [scriptName, ...args],{ capture: [ 'stdout', 'stderr' ]});

    const { stdout, stderr } = await pythonProcess

    if (stderr) {
      console.error('Error executing Python script:', stderr);
    } else {
      return stdout
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}
