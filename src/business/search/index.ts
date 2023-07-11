import e from 'express';
import * as fs from 'fs';
interface EmailThread {
	created_at: string;
}
const readStream = fs.createReadStream('./emails.txt', {encoding: 'utf8', highWaterMark: 1024 * 1024 * 30});
const emailThreads = [];
let errors = 0
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
			errors=errors+1
		}
		return parsedLine;
	});
	parsedLines = parsedLines.filter((line) => {
		return line !== undefined;
	});

	emailThreads.push(...parsedLines);
});

readStream.on('end', () => {
	console.log(errors)
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
	return false
}
export async function getEmails(searchString: string, ticketBy?: string) {
	const filter ={}
	if (ticketBy === 'user') {
		filter['channel'] = 'email'
	} else if (ticketBy === 'support') {
		filter['channel'] = 'web'
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
		if (emailThread.comments?.length === 0) {
			continue;
		}
		let fxxaa = [];
		if (andOr === 'and') {
			fxxaa = emailThread.comments.filter((c: any) => {
				if (
					addFilter(c.via.channel, filter) &&
					searchStringItems.map((i) => c.plain_body.toLowerCase().includes(i)).every((v) => v === true)
				) {
					return true;
				}
				return false;
			});
		} else {
			fxxaa = emailThread.comments.filter((c: any) => {
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
				group: emailThread.group?.name
			};
			results.push(singleOutput);
		}
	}
	return {
		counters,
		data: results
	};
}