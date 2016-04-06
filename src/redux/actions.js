import constants from './constants'


let actions = {
	//async!
	displayQuestions: function() {
		console.log('display questions')
		return {
			type: constants.DISPLAY_QUESTIONS
		}
	},
	submitQuestion: function(newQuestion) {
		console.log('subimtted', newQuestion)
		return {
			type: constants.SUBMIT_QUESTION,
			newQuestion: newQuestion
		}
	},

	deleteQuestion: function(id) {
		return {
			type:constants.DELETE_QUESTION,
			id: id
		}
	},

	editQuestion: function(id) {
		return {
			type:constants.EDIT_QUESTION,
			id: id
		}
	},

	upvoteQuestion: function(id) {
		return {
			type: constants.UPVOTE_QUESTION,
			id: id
		}
	},
	downvoteQuestion: function(id) {
		return {
			type: constants.DOWNVOTE_QUESTION,
			id: id
		}
	}
}



export default actions