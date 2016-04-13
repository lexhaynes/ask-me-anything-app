import axios from 'axios'
import querystring from 'querystring'
import constants from './constants'
import initialState from './initialState'

let actions = {
	//GET
	displayQuestions: function() {
		return {
		type: constants.DISPLAY_QUESTIONS,
		requestStatus: constants.REQUESTING,
		
		}
			
	},
	//POST
	submitQuestion: function(title, submitTime, submitter) {
		return {
			type: constants.SUBMIT_QUESTION,
			title: title,
			submitTime: submitTime,
			submitter: submitter,
			approvalStatus: constants.QUESTION_PENDING
		}
	},
	
	//DELETE
	deleteQuestion: function(id) {
		return { 
			type:constants.DELETE_QUESTION,
			id: id
		}
	},

	updateQuestion: function(id, title) {
		return {	
		type: constants.UPDATE_QUESTION,
		id:id,
		title: title,
		editingQuestion: false
		}
	},

	cancelEditQuestion: function(id) {
		return {
			type: constants.CANCEL_EDIT_QUESTION,
			id: id,
			editingQuestion: false
		}
	},

	editQuestion: function(id) {
		return {
			type:constants.EDITING_QUESTION,
			id: id,
			editingQuestion: true
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
	},

	//async PUT
	approveQuestion: function(id) {
		return {
			type: constants.APPROVE_QUESTION,
			id:id,
			approvalStatus: constants.QUESTION_APPROVED
		}
	},
	//async DELETE
	rejectQuestion: function(id) {
		return {
			type: constants.REJECT_QUESTION,
			id:id,
			approvalStatus: constants.QUESTION_REJECTED			
		}
	},

	//async put
	submitAnswer: function(id, answer) {
		return {
			type: constants.SUBMIT_ANSWER,
			id:id,
			answer: answer,
			editingAnswer: false,
		}
	},

	editAnswer: function(id) {
		return {
			type:constants.EDITING_ANSWER,
			id: id,
			editingAnswer: true
		}
	},

	filterQuestions: function(query) {
		return {
			type: constants.FILTER_QUESTIONS,
			query: query
		}
	}

	


}



export default actions