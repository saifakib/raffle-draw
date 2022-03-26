// external imports
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


// internal imports
const { notFoundHandler, errorHandler} = require('./middleware/errorHandler')
const Routes = require('./routes')

const app = express();

// build in middleware
app.use([morgan('dev'), cors(), express.json()]);


// route setup
app.use('/api/v1/tickets', Routes)

// error handling
app.use(notFoundHandler)
app.use(errorHandler)


module.exports = app