const errorMiddleware = (err, req, res, next) => {

    // Create a Subscription -> check for renewal date -> middleware(check for errors) -> next -> controller

    try {

        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // Mongoose bad ObjectId
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message, 404);
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = `Duplicate field value entered`;
            error = new Error(message, 400);
        }

        // Mongoose validation error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new Error(message.join(', '), 400);

        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error",
        });


    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;

