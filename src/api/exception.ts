import {BaseError} from 'lib/error';
export class HTTPError extends BaseError {
	statusCode: number;
	errorCode: string;

	constructor(message, statusCode, errorCode?) {
		super(message);
		this.name = 'HTTPError';
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends HTTPError {
	constructor(message, errorCode?) {
		super(message, 400, errorCode);
		this.name = 'BadRequestError';
	}
}

export class ResourceNotFoundError extends HTTPError {
	constructor(message, errorCode?) {
		super(message, 404, errorCode);
		this.name = 'ResourceNotFoundError';
	}
}


export class ForbiddenError extends HTTPError {
    constructor(message, errorCode?) {
        super(message, 403, errorCode);
        this.name = 'ForbiddenError';
    }
}

export class UnauthorizedError extends HTTPError {
    constructor(message, errorCode?) {
        super(message, 401, errorCode);
        this.name = 'UnauthorizedError';
    }
}


export class InternalServerError extends HTTPError {
    constructor(message, errorCode?) {
        super(message, 500, errorCode);
        this.name = 'InternalServerError';
    }
}