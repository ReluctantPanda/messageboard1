export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
};
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};
