module.exports = /**
 * Module to convert function to Promise
 * @date 26/09/2023 - 12:39:59
 *
 * @param {*} fn
 * @returns {(req: any, res: any, next: any) => void}
 */
(fn) => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next))
			.catch(error => {
				return next(error);
			});
	};
};
