//import constants from './constants'

export default function() {
	return {
		isLoading: true,
		questions: [{
				id: 0,
				title: "question title",
				submitTime: "dateTimeString", //note that we will add a submitTime for local state update, and created_at on db side for when the item is actually posted to db
				answer: {
					text: "answer to the question",
					answerTime: "dateTimeString"
				},
				submitter: "question submitter",
				upvotes: 0,
				comments: [{
						id: 0,
						text: "comment text",
						user: "username",
						submitTime: "dateTimeString",
						upvotes: 0
					}],
				
			}]
	}
}
