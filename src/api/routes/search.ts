import express from 'express';
import {getEmails} from 'business/search';
import {asyncHandler} from 'api/utils';
import {BadRequestError} from 'api/exception';
import {ERROR_CODE} from 'utils/constants';

const router = express.Router();


router.get('/', asyncHandler(async function (req, res) {
	const searchString = req.query.searchString || '';
	const ticketBy = req.query.ticketBy || null;
	const results = await getEmails(searchString, ticketBy);
	res.send(results);
}));


export default router;
