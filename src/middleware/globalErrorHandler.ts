import dotenv from 'dotenv';
dotenv.config();

const globalErrorHandler = (err: any, req: any, res: any,next: any) => {
              err.statusCode = err.statusCode || 500;
                err.status = err.status || 'error';

                res.status(err.statusCode).json({
                    status: err.status,
                    message: err.message,
                    stack: process.env.NODE_ENV === 'production' ? null : err.stack
                });
}


export default globalErrorHandler;