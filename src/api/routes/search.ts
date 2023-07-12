import express from 'express';
import {getEmails, getEmail} from 'business/search';
import {asyncHandler} from 'api/utils';
import {BadRequestError} from 'api/exception';
import {ERROR_CODE} from 'utils/constants';

const router = express.Router();


router.get('/', asyncHandler(async function (req, res) {
	const searchString = req.query.searchString || '';
	const ticketBy = req.query.ticketBy || null;
	const startDate = req.query.startDate || null;
	const endDate = req.query.endDate || null;
	const results = await getEmails(searchString, ticketBy, startDate, endDate);
	res.send(results);
}));

router.get('/details', asyncHandler(async function (req, res) {
	const results = await getEmail(req.query.id);
	res.send(results);
}));


export default router;
