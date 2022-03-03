// customize error handler for middleware

const errorHandler = (err, req, res, next) => {
    // if status code is defined use it else set error status code to 500
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}