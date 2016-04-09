import constants from './constants'
import initalState from './initialState'

let reducer = function(state, action) {
	switch (action.type) {

		case constants.DISPLAY_QUESTIONS:
			return Object.assign({}, state, {
				requestStatus: action.requestStatus,
				questions: action.questions.map((q) => {
					return {
			        	title: q.title,
						submitTime: q.submitTime || q.created_at,
						submitter: q.submitter,
						upvotes: q.upvotes,
						answer: q.answer,
						photo: q.photo,
						editingAnswer: q.editingAnswer,
						approvalStatus: q.approvalStatus,
						id: q._id
				}
			}) 
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
					answer: "",
					editingAnswer: state.editingAnswer,
					approvalStatus: action.approvalStatus,
					index: state.questions.length - 1 //assume for now index is index.
		        }]
			 })

  		case constants.DELETE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.filter((q) => {		    
		            return q.id !== action.id
		        })
		      })

		case constants.UPDATE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
		            title: action.title,
					editingQuestion: action.editingQuestion
		            }) : q
		        })
		      })


		case constants.EDITING_QUESTION: 
			return Object.assign({}, state, {
	        questions: state.questions.map((q) => {
	          return q.id === action.id ? 
	            Object.assign({}, q, {
				editingQuestion: action.editingQuestion
	            }) : q
	        })
	      })
			    
		      

		//do more to update state here... 
		case constants.APPROVE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
		            	approvalStatus: action.approvalStatus
		            }) : q
		        })
		      })

		//do more to update state here...
		case constants.REJECT_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
		            	approvalStatus: action.approvalStatus
		            }) : q
		        })
		      })

		//do more to update state here...
		case constants.SUBMIT_ANSWER: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
		            answer: action.answer,
					editingAnswer: action.editingAnswer
		            }) : q
		        })
		      })

		case constants.EDITING_ANSWER: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
					editingAnswer: action.editingAnswer
		            }) : q
		        })
		      })


			    

		default: 
	      return state;
	}
}

export default reducer