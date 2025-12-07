const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err }

        error.message = err.message;

        if (err.name === 'CastError') {
            const message = 'resource not found';
            error = new error(message)
            error.statusCode = 404;
        }

        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new error(message)
            error.statusCode = 400;
        }

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message).join(', ');
            error = new error(message)
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })

    } catch (error) {
        next(error)
    }
}

export default errorMiddleware;