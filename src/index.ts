import app from 'api/app';
import config from 'configuration';
import logger from 'lib/logger';
// import * as fs from 'fs';

const server = app.listen(config.PORT, () => {
	logger.info(`Listening to port ${config.PORT}`);
});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	// exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	logger.info('SIGTERM received');
	if (server) {
		server.close();
	}
});
