import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
require('express-async-errors');
import morganMiddleware from 'api/middleware/logging';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from 'api/routes';
import {HTTPError, InternalServerError} from 'api/exception';
import {asyncHandler} from 'api/utils';

const app = express();

app.use(morganMiddleware);
app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

function errorHandler(err, req, res, next) {
	if (err instanceof HTTPError) {
		res.status(err.statusCode).json({message: err.message, errorCode: err.errorCode});
	} else {
		// TODO log to sentry
		res.status(500).json({error: 'Something went wrong'});
	}
}

app.use('/v1', routes);

app.use(errorHandler);

app.get('/health', async (req, res) => {
	res.send('healthy');
});

export default app;
