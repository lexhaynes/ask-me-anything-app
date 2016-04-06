import constants from './constants'
import initalState from './initialState'

let reducer = function(state, action) {
	switch (action.type) {

		case constants.DISPLAY_QUESTIONS:
			//for now do nothing
			return state; 

		case constants.UPVOTE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q, index) => {
		          return index === action.id ? 
		            Object.assign({}, q, {
		            	upvotes: q.upvotes+=1
		            }) : state 
		        })
		      })

		case constants.DOWNVOTE_QUESTION: 

			return Object.assign({}, state, {
		        questions: state.questions.map((q, index) => {
		          return index === action.id ? 
		            Object.assign({}, q, {
		            	upvotes: q.upvotes === 0 ? q.upvotes = 0 : q.upvotes-=1
		            }) : state 
		        })
		      })

		case constants.SUBMIT_QUESTION: 
			return Object.assign({}, state, {
				//ASSIGN NEW QUESTION HERE
			})

		default: 
	      return state;
	}
}

export default reducer