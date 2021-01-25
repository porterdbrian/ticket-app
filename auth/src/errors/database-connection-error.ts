import {CustomError} from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    message = 'Error connecting to database';
    constructor() {
        super('Error connecting to database');
        // Extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{
            message: this.message
        }];
    }
}