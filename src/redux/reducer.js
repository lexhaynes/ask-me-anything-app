import constants from './constants'
import initalState from './initialState'

let reducer = function(state, action) {
	switch (action.type) {

		case constants.DISPLAY_QUESTIONS:
			return Object.assign({}, state, {
				requestStatus: action.requestStatus,
				questions: state.questions.map((q) => {
					return {
			        	title: q.title,
						submitTime: q.submitTime ,
						submitter: q.submitter,
						upvotes: q.upvotes,
						answer: q.answer,
						photo: getRandomImg(),
						editingAnswer: q.editingAnswer,
						approvalStatus: q.approvalStatus,
						id: q.id
				}
			}) 
		})

		case constants.UPVOTE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
		            	upvotes: q.upvotes+=1
		            }) : q 
		        })
		      })

		case constants.DOWNVOTE_QUESTION: 
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
		            	upvotes: q.upvotes === 0 ? q.upvotes = 0 : q.upvotes-=1
		            }) : q
		        })
		      })

		case constants.SUBMIT_QUESTION: 
  			return Object.assign({}, state, {
		        questions: [{
		        	title: action.title,
					submitTime: action.submitTime,
					submitter: action.submitter,
					upvotes: 0,
					answer: "",
					editingAnswer: state.editingAnswer,
					approvalStatus: action.approvalStatus,
					index: state.questions.length - 1 //assume for now index is index.
		        }, ...state.questions]
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

		case constants.CANCEL_EDIT_QUESTION:
			console.log('cancel')
			return Object.assign({}, state, {
		        questions: state.questions.map((q) => {
		          return q.id === action.id ? 
		            Object.assign({}, q, {
					editingQuestion: action.editingQuestion
		            }) : q
		        })
		      })	
			 

	case constants.FILTER_QUESTIONS: 
		return Object.assign({}, state, {
	        searchTerm: action.query	
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

//temp random img generator
function getRandomImg() {
  var categories =[ "abstract","animals","business","cats","city","food","nightlife","fashion","people","nature","sports","technics","transport" ];
  var max = categories.length, 
      min = 0;

  return "https://lorempixel.com/100/100/"+categories[Math.floor(Math.random() * (max - min)) + min];
}


export default reducer