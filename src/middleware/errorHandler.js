
const createError = require('http-errors')

/**
 * 404 not found error handler
 * @param {function} _ 
 * @param {function} _ 
 * @param {function} next 
 */
 const notFoundHandler = (_, _, next) => {
    next(createError(404, "Your request content was not found"))
}

/**
 * Default error handler
 * @param {fun} error 
 * @param {fun} _ 
 * @param {fun} res 
 * @param {fun} _ 
 * @returns {Error}
 */
 const errorHandler = (error, _, res, _) => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
}

module.exports = {
    notFoundHandler,
    errorHandler
}