
const errorHandler = (e, req, res, next) => {
    const statusCode = res.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: e.message,
        statusCode,
        stack: process.env.NODE_ENV === "production" ? null : e.stack
    })
}

const notFound = (req, res, next) => {
    const error = new Error(`That route doesnt exist - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

export {errorHandler, notFound};