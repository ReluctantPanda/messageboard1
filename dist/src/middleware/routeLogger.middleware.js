export const routeLogger = (req, res, next) => {
    const startTime = Date.now();
    // Log request
    console.log(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    // Capture response finish
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });
    next();
};
