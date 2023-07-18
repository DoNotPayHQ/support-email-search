import express from 'express';
import {getEmails, getEmail, getEmails2, combineEmails} from 'business/search';
import {asyncHandler} from 'api/utils';
import {BadRequestError} from 'api/exception';
import {ERROR_CODE} from 'utils/constants';

const router = express.Router();


router.get('/', asyncHandler(async function (req, res) {
	const searchString = req.query.searchString || '';
	const ticketBy = req.query.ticketBy || null;
	const startDate = req.query.startDate || null;
	const endDate = req.query.endDate || null;
	const latest = req.query.latest || false;
	const secondSearchString = req.query.secondSearchString || null;
	const secondTicketBy = req.query.secondTicketBy || null;
	const secondLatest = req.query.secondLatest || null;
	console.log('first', searchString, ticketBy, startDate)
	console.log('second', secondSearchString, secondTicketBy, secondLatest)
	let results = {}
	if (!secondSearchString) {
		results = await getEmails(searchString, ticketBy, startDate, endDate, latest );
	} else {
		const emailList1 = await getEmails(searchString, ticketBy, startDate, endDate, latest);
		const emailList2 = await getEmails2(secondSearchString, secondTicketBy, startDate, endDate, secondLatest );
		results = combineEmails(emailList1.data, emailList2.data);
	}
	res.send(results);
}));

router.get('/details', asyncHandler(async function (req, res) {
	const results = await getEmail(req.query.id);
	res.send(results);
}));


export default router;
