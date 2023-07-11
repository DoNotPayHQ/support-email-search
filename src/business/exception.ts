import {BaseError} from 'lib/error';

export class BusinessError extends BaseError {
	constructor(message) {
		super(message);
	}
}
