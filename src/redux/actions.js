import constants from './constants'


let actions = {
	//async!
	displayQuestions: function() {
		console.log('display questions')
		return {
			type: constants.DISPLAY_QUESTIONS
		}
	},
	submitQuestion: function(title, submitTime, submitter) {
		return {
			type: constants.SUBMIT_QUESTION,
			title: title,
			submitTime: submitTime,
			submitter: submitter
		}
	},

	deleteQuestion: function(index) {
		return {
			type:constants.DELETE_QUESTION,
			index: index
		}
	},

	editQuestion: function(index) {
		return {
			type:constants.EDIT_QUESTION,
			index: index
		}
	},

	upvoteQuestion: function(index) {
		return {
			type: constants.UPVOTE_QUESTION,
			index: index
		}
	},
	downvoteQuestion: function(index) {
		return {
			type: constants.DOWNVOTE_QUESTION,
			index: index
		}
	}
}



export default actions