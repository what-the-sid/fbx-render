const fs = require('fs')
module.exports = /**
 * Module to fetch all scripts inside a folder
 * @date 26/09/2023 - 12:39:02
 *
 * @param {string} path
 * @param {string} suffix
 * @param {string} basename
 * @returns {[filepaths]}
 */
(path,suffix,basename) => {
	return fs
		.readdirSync(path)
		.filter(file => {
			return (
				file.indexOf('.') !== 0 &&
				file !== basename &&
				file.indexOf(suffix) > 0
			);
		})
}
