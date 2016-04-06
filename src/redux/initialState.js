//import constants from './constants'

export default function() {
	return {
		isLoading: true,
		questions: [{
				id: 0,
				title: "question title",
				submitTime: "dateTimeString",
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
