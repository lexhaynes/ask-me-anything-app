import constants from './constants'
import initalState from './initialState'

let reducer = function(state, action) {
	switch (action.type) {

		case constants.DISPLAY_QUESTIONS:
			//for now do nothing
			return Object.assign({}, state) 

		case constants.UPVOTE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q, index) => {
		          return index === action.id ? 
		            Object.assign({}, q, {
		            	upvotes: q.upvotes+=1
		            }) : q 
		        })
		      })

		case constants.DOWNVOTE_QUESTION: 

			return Object.assign({}, state, {
		        questions: state.questions.map((q, index) => {
		          return index === action.id ? 
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
					id: state.questions.length - 1 //assume for now id is index.
		        }]
			 })

			    

		default: 
	      return state;
	}
}

export default reducer