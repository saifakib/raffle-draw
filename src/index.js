// external imports
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


// internal imports
const { notFoundHandler, errorHandler} = require('./middleware/errorHandler')
const Routes = require('./routes')

const app = express();

// build in middleware
app.use(cors());
app.use(morgan('dev'))


// route setup
app.use('/', Routes)

// error handling
app.use(notFoundHandler)
app.use(errorHandler)


module.exports = app