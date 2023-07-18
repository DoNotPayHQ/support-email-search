import e from 'express';
import * as fs from 'fs';
interface EmailThread {
	created_at: string;
}
const readStream = fs.createReadStream('./emails.txt', {encoding: 'utf8', highWaterMark: 1024 * 1024 * 30});
const emailThreads = [];
let errors = 0;
readStream.on('data', (chunk) => {
	// process the data chunk
	let buffer = '';
	buffer += chunk;
	const lines = buffer.split('\n');
	let parsedLines = lines.map((line) => {
		let parsedLine;
		try {
			parsedLine = JSON.parse(line);
		} catch (error) {
			errors = errors + 1;
		}
		return parsedLine;
	});
	parsedLines = parsedLines.filter((line) => {
		return line !== undefined;
	});

	emailThreads.push(...parsedLines);
});

readStream.on('end', () => {
	console.log(errors);
	console.log('file has been read completely');
});

function addFilter(channel, filter) {
	if (Object.keys(filter).length === 0) {
		return true;
	}
	if (filter?.channel === 'email') {
		if (channel === 'email') {
			return true;
		}
	}
	if (filter?.channel === 'web') {
		if (channel === 'web') {
			return true;
		}
	}
	return false;
}
export async function getEmail(id) {
	const idInt = Number(id);
	console.log('length', emailThreads.length);
	const emailThread = emailThreads.find((emailThread) => {
		return emailThread.id === idInt;
	});
	if (!emailThread) {
		return null;
	}
	return {
		createdAt: emailThread.created_at,
		subject: emailThread.subject,
		updatedAt: emailThread.updated_at,
		requester: emailThread.requester?.name,
		id: emailThread.id,
		group: emailThread.group?.name,
		description: emailThread.description,
		type: emailThread.type,
		status: emailThread.status,
		comments: emailThread.comments
	};
}
export const combineEmails = (emailList1, emailList2) => {
	// find the common emails by id
	const email2Ids = emailList2.map((email2) => {
		return email2.id;
	});
	const email1Ids = emailList1.map((email1) => {
		return email1.id;
	});
	const commonEmails = emailList1.filter((email1) => {
		return email2Ids.includes(email1.id);
	});
	const counters = {count: 0, byDates: {}};
	for (const email of commonEmails) {
		counters.count++;
		const createdAt = new Date(email.createdAt);
		if (counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`]) {
			counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`]++;
		} else {
			counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`] = 1;
		}
	}
	return {
		counters,
		data: commonEmails
	}
};

export async function getEmails2(
	searchString: string,
	ticketBy?: string,
	fromDate?: string,
	toDate?: string,
	latest?: boolean
) {
	const filter = {};
	if (ticketBy === 'user') {
		filter['channel'] = 'email';
	} else if (ticketBy === 'support') {
		filter['channel'] = 'web';
	}
	console.log('searchString', searchString);
	let andOr = 'or';
	let searchStringItems;
	if (searchString.includes('&&')) {
		searchStringItems = searchString.split('&&');
		andOr = 'and';
	} else if (searchString.includes('||')) {
		searchStringItems = searchString.split('||');
	} else {
		searchStringItems = [searchString];
	}
	// trip white space
	searchStringItems = searchStringItems.map((searchStringItem) => {
		return searchStringItem.trim();
	});
	const counters = {count: 0, byDates: {}};
	const results = [];
	for (const emailThread of emailThreads) {
		const createdAt = new Date(emailThread.created_at);
		if (fromDate) {
			const fromDateObj = new Date(fromDate);
			if (createdAt < fromDateObj) {
				continue;
			}
		}
		if (toDate) {
			const toDateObj = new Date(toDate);
			if (createdAt > toDateObj) {
				continue;
			}
		}
		if (emailThread.comments?.length === 0) {
			continue;
		}
		let comments = emailThread.comments;
		if (latest) {
			comments = [comments[comments.length - 1]];
		}
		let fxxaa = [];
		if (andOr === 'and') {
			fxxaa = comments.filter((c: any) => {
				if (
					addFilter(c.via.channel, filter) &&
					searchStringItems.map((i) => c.plain_body.toLowerCase().includes(i)).every((v) => v === true)
				) {
					return true;
				}
				return false;
			});
		} else {
			fxxaa = comments.filter((c: any) => {
				if (
					addFilter(c.via.channel, filter) &&
					searchStringItems.map((i) => c.plain_body.toLowerCase().includes(i)).includes(true)
				) {
					return true;
				}
				return false;
			});
		}
		if (fxxaa.length > 0) {
			counters.count++;
			if (counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`]) {
				counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`]++;
			} else {
				counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`] = 1;
			}
		}
		if (fxxaa.length > 0) {
			const singleOutput = {
				createdAt: emailThread.created_at,
				subject: emailThread.subject,
				updatedAt: emailThread.updated_at,
				requester: emailThread.requester?.name,
				id: emailThread.id,
				group: emailThread.group?.name,
				description: emailThread.description
			};
			results.push(singleOutput);
		}
	}
	return {
		counters,
		data: results
	};
}

export async function getEmails(
	searchString: string,
	ticketBy?: string,
	fromDate?: string,
	toDate?: string,
	latest?: boolean,
) {
	const filter = {};
	if (ticketBy === 'user') {
		filter['channel'] = 'email';
	} else if (ticketBy === 'support') {
		filter['channel'] = 'web';
	}
	console.log('searchString', searchString);
	console.log('filter', filter);
	let andOr = 'or';
	let searchStringItems;
	if (searchString.includes('&&')) {
		searchStringItems = searchString.split('&&');
		andOr = 'and';
	} else if (searchString.includes('||')) {
		searchStringItems = searchString.split('||');
	} else {
		searchStringItems = [searchString];
	}
	// trip white space
	searchStringItems = searchStringItems.map((searchStringItem) => {
		return searchStringItem.trim();
	});
	const counters = {count: 0, byDates: {}};
	const results = [];
	for (const emailThread of emailThreads) {
		const createdAt = new Date(emailThread.created_at);
		if (fromDate) {
			const fromDateObj = new Date(fromDate);
			if (createdAt < fromDateObj) {
				continue;
			}
		}
		if (toDate) {
			const toDateObj = new Date(toDate);
			if (createdAt > toDateObj) {
				continue;
			}
		}
		if (emailThread.comments?.length === 0) {
			continue;
		}
		let comments = emailThread.comments;
		if (latest) {
			comments = [comments[comments.length - 1]];
		}
		let fxxaa = [];
		if (andOr === 'and') {
			fxxaa = comments.filter((c: any) => {
				if (
					addFilter(c.via.channel, filter) &&
					searchStringItems.map((i) => c.plain_body.toLowerCase().includes(i)).every((v) => v === true)
				) {
					return true;
				}
				return false;
			});
		} else {
			fxxaa = comments.filter((c: any) => {
				if (
					addFilter(c.via.channel, filter) &&
					searchStringItems.map((i) => c.plain_body.toLowerCase().includes(i)).includes(true)
				) {
					return true;
				}
				return false;
			});
		}
		if (fxxaa.length > 0) {
			counters.count++;
			if (counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`]) {
				counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`]++;
			} else {
				counters['byDates'][`${createdAt.getUTCMonth() + 1}-${createdAt.getFullYear()}`] = 1;
			}
		}
		if (fxxaa.length > 0) {
			const singleOutput = {
				createdAt: emailThread.created_at,
				subject: emailThread.subject,
				updatedAt: emailThread.updated_at,
				requester: emailThread.requester?.name,
				id: emailThread.id,
				group: emailThread.group?.name,
				description: emailThread.description
			};
			results.push(singleOutput);
		}
	}
	return {
		counters,
		data: results
	};
}
