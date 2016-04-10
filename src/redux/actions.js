import axios from 'axios'
import constants from './constants'
import initialState from './initialState'


let actions = {
	//async
	displayQuestions: function() {
		return dispatch => {
			dispatch({
				type: constants.DISPLAY_QUESTIONS,
				requestStatus: constants.REQUESTING,
				questions: initialState().questions
			})
			return axios.get(constants.API_QUESTIONS).then(function(response) {
				dispatch({
					type: constants.DISPLAY_QUESTIONS,
					requestStatus: constants.REQUEST_SUCCESS,
					questions: response.data	
				})
			}).catch(function(error) {
				console.log('error', error)
	    		 dispatch({
	     		 	type: constants.REQUEST_ERROR,
	     		 	requestStatus: constants.REQUEST_ERROR
	     		 })	   
			})			
		}
	},
	//async POST
	submitQuestion: function(title, submitTime, submitter) {
		return dispatch => {
			return axios.post(constants.API_QUESTIONS, {
				title: title,
				submitter: submitter,
				approvalStatus: constants.QUESTION_PENDING
			}).then(function(response) {
				dispatch({
					type: constants.SUBMIT_QUESTION,
					title: title,
					submitTime: submitTime,
					submitter: submitter,
					approvalStatus: constants.QUESTION_PENDING	
				})
			}).catch(function(error) {
				console.log('error', error)
        		 dispatch({
	     		 	type: constants.REQUEST_ERROR,
	     		 	//requestStatus: constants.REQUEST_ERROR
	     		 })	   
			})
		}
	},
	
	//async
	deleteQuestion: function(id) {
		return dispatch => {
			return axios.delete(constants.API_QUESTION + id , {
				type:constants.DELETE_QUESTION,
				id: id
			}).then(function() {
	
				//query the db again to make sure page live updates
				axios.get(constants.API_QUESTIONS).then(function(response) {
					dispatch({
						type: constants.DISPLAY_QUESTIONS,
						requestStatus: constants.REQUEST_SUCCESS,
						questions: response.data	
					})
				})
			}).then(function(response) {
				dispatch({
					type:constants.DELETE_QUESTION,
					id: id
				})
			}).catch(function(error) {
				console.log('error', error)
        		 dispatch({
	     		 	type: constants.REQUEST_ERROR,
	     		 	//requestStatus: constants.REQUEST_ERROR
	     		 })	   
			})
		}
	},

	updateQuestion: function(id, title) {
		return dispatch => {
			//dispatch to state before we even make put request
			dispatch({
				type: constants.UPDATE_QUESTION,
				title: title,
				editingQuestion: false
				
			})
			return axios.put(constants.API_QUESTION + id , {
				key: "title",
				value: title,
			}).then(function(response) {
				dispatch({
					type: constants.UPDATE_QUESTION,
					id:id,
					title: title,
					editingQuestion: false
				})
			}).catch(function(error) {
				console.log('error', error)
        		 dispatch({
	     		 	type: constants.REQUEST_ERROR,
	     		 	//requestStatus: constants.REQUEST_ERROR
	     		 })	   
			})
		}
	},

	editQuestion: function(id) {
		return {
			type:constants.EDITING_QUESTION,
			id: id,
			editingQuestion: true
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
	},

	//async PUT
	approveQuestion: function(id) {
		return dispatch => {
			return axios.put(constants.API_QUESTION + id , {
				key: "approvalStatus",
				value: constants.QUESTION_APPROVED
			}).then(function(response) {
				console.log('response: ', response)
				dispatch({
					type: constants.APPROVE_QUESTION,
					id:id,
					approvalStatus: constants.QUESTION_APPROVED

				})
			}).catch(function(error) {
				console.log('error', error)
        		 dispatch({
	     		 	type: constants.REQUEST_ERROR,
	     		 	//requestStatus: constants.REQUEST_ERROR
	     		 })	   
			})
		}
	},
	//async DELETE
	rejectQuestion: function(id) {
		return dispatch => {
			return axios.delete(constants.API_QUESTION + id , {
				approvalStatus: constants.QUESTION_REJECTED
			}).then(function(response) {
				dispatch({
					type: constants.REJECT_QUESTION,
					id:id,
					approvalStatus: constants.QUESTION_REJECTED
				})
			}).catch(function(error) {
				console.log('error', error)
        		 dispatch({
	     		 	type: constants.REQUEST_ERROR,
	     		 	//requestStatus: constants.REQUEST_ERROR
	     		 })	   
			})
		}
	},

	//async put
	submitAnswer: function(id, answer) {
		return dispatch => {
			//dispatch to state before we even make put request
			dispatch({
				type: constants.SUBMIT_ANSWER,
				answer: answer,
				editingAnswer: false
				
			})
			return axios.put(constants.API_QUESTION + id , {
				key: "answer",
				value: answer,
			}).then(function(response) {
				dispatch({
					type: constants.SUBMIT_ANSWER,
					id:id,
					answer: answer,
					editingAnswer: false
				})
			}).catch(function(error) {
				console.log('error', error)
        		 dispatch({
	     		 	type: constants.REQUEST_ERROR,
	     		 	//requestStatus: constants.REQUEST_ERROR
	     		 })	   
			})
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