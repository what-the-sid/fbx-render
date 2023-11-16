const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

module.exports = (folder) =>{
  return multer.diskStorage({
    destination: process.cwd()+folder,
    filename: (req, file, callback) => {
      const uniqueFilename = uuidv4() + path.extname(file.originalname);
      callback(null, uniqueFilename);
    },
  });
}
