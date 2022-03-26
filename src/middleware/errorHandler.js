
const createError = require('http-errors')

/**
 * 404 not found error handler
 * @param {function} req
 * @param {function} res
 * @param {function} next 
 */
 const notFoundHandler = (req, res, next) => {
    next(createError(404, "Your request content was not found"))
}

/**
 * Default error handler
 * @param {fun} error 
 * @param {fun} req
 * @param {fun} res 
 * @param {fun} next
 * @returns {Error}
 */
 const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
}

module.exports = {
    notFoundHandler,
    errorHandler
}