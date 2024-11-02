const express = require('express');
const createError = require('http-errors')
const app = express();
require('dotenv').config()

// Middlewares
app.use(require('cors')())
app.use(express.json())
app.use(require('morgan')('dev'))

const ctls = require('./controllers')

// Routes
app.get('/getAllProblems', ctls.getAllProblems)
app.get('/getProb/:problem_id', ctls.getProblem)
app.post('/getHint', ctls.getHint)

// Error Handling
app.use(async(req, res, next) => {
    next(createError.NotFound("This route does not exist"))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// Server Listening
app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`)
})