const errorMiddleware = (err, req, res, next) => {
    try {
        //make a copy of the error object 
        let error = { ...err }
        error.message = err.message;
        //log the error for dev
        if (err.name === 'CastError') {
            const message = 'resource not found';
            error = new Error(message)
            error.statusCode = 404;
        }
        //duplicate key error in mongoose
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message)
            error.statusCode = 400;
        }
        //validation error in mongoose
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message).join(', ');
            error = new Error(message)
            error.statusCode = 400;
        }
        //send the error response in json format
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })

    } catch (error) {
        next(error)
    }
}

export default errorMiddleware;