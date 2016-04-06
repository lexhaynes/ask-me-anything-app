import constants from './constants'
import initalState from './initialState'

let reducer = function(state, action) {
	switch (action.type) {

		case constants.DISPLAY_QUESTIONS:
			return Object.assign({}, state, {
				requestStatus: action.requestStatus,
				questions: action.questions
			}) 

		case constants.UPVOTE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q, index) => {
		          return index === action.index ? 
		            Object.assign({}, q, {
		            	upvotes: q.upvotes+=1
		            }) : q 
		        })
		      })

		case constants.DOWNVOTE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q, index) => {
		          return index === action.index ? 
		            Object.assign({}, q, {
		            	upvotes: q.upvotes === 0 ? q.upvotes = 0 : q.upvotes-=1
		            }) : q
		        })
		      })

		case constants.SUBMIT_QUESTION: 
  			return Object.assign({}, state, {
		        questions: [...state.questions, {
		        	title: action.title,
					submitTime: action.submitTime,
					submitter: action.submitter,
					upvotes: 0,
					answer: {
						answerTime: '', text: ''
					},
					comments: [],
					approvalStatus: action.approvalStatus,
					index: state.questions.length - 1 //assume for now index is index.
		        }]
			 })

  		case constants.DELETE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.filter((q, index) => {		    
		            	return index !== action.index
		        })
		      })

		//do more to update state here... 
		case constants.APPROVE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q._id === action.id ? 
		            Object.assign({}, q, {
		            	approvalStatus: constants.QUESTION_APPROVED
		            }) : q
		        })
		      })

		//do more to update state here...
		case constants.REJECT_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q, index) => {
		          return index === action.index ? 
		            Object.assign({}, q, {
		            	approvalStatus: constants.QUESTION_REJECTED
		            }) : q
		        })
		      })

		//stage two
		case constants.EDIT_QUESTION: 
			return state;


			    

		default: 
	      return state;
	}
}

export default reducer