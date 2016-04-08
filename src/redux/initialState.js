import constants from './constants'

export default function() {
	var now = new Date().toISOString();
	return {
		requestStatus: constants.REQUESTING,
		questions: [{
				id: 0,
				approvalStatus: constants.QUESTION_PENDING,
				title: "Ask me Anything",
				submitTime: now , //note that we will add a submitTime for local state update, and created_at on db side for when the item is actually posted to db
				answer:  "",
				editingAnswer: true,
				editingQuestion: true,
				submitter: "You",
				upvotes: 0				
			}]
	}
}
