"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandle {
    static notFound(req, res, next) {
        // res.status(404).send("Path not found")
        const error = new Error("Path not found");
        error.status = 404;
        next(error);
    }
    static generic(error, req, res, next) {
        console.log(error);
        const objError = {
            name: error.name,
            status: error.status ?? 500,
            message: error.message
        };
        if (process.env.NODE_ENV !== 'production') {
            objError.stack = error.stack;
        }
        // res.status(error.status).send(error.message)
        res.status(error.status ? error.status : 500).json(objError);
    }
    static catchError(ftn) {
        return (req, res, next) => {
            return ftn(req, res, next).catch((err) => {
                console.log('into ', err);
                const error = new Error('Async error');
                error.name = err.status ? 'Async error' : 'Database error';
                error.message = err.message;
                error.stack = err.stack;
                error.status = err.status ? err.status : 503;
                next(error);
            });
        };
    }
}
exports.default = ErrorHandle;
