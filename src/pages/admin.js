import React from "react"
import { browserHistory } from 'react-router';
import classnames from 'classnames'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import initialState from '../redux/initialState'
import QuestionForm from '../components/QuestionForm'
import constants from '../redux/constants'

export default class Admin extends React.Component {  
  constructor(props) {
    super(props);    
    props.actions.displayQuestions();
    this.state = {
      answers: [""]
    }
    this.updateAnswer = this.updateAnswer.bind(this)
  }

  updateAnswer(index, e) {
      var updated = this.props.questions.map(function(q, i) {
        return i === index ? e.target.value : q.answer
    });
    this.setState({
      answers: updated
    })
  }

  home() {
      browserHistory.push('/');
  }

  render() {
    var _this = this;
    var questions = this.props.questions.map(function(q, index) {
      var approved = "approved-" + String(q.approvalStatus === constants.QUESTION_APPROVED);
 

      var answer = q.editingAnswer ?
              //editing answer state
                <div>
                <input type = "text" placeholder = "Answer Question" defaultValue = {_this.props.questions[index].answer} value = {_this.state.answers[index]} onChange = {_this.updateAnswer.bind(_this, index)} />
                <button 
                  className={"button"} 
                  onClick={_this.props.actions.submitAnswer.bind(_this, q.id,  _this.state.answers[index])}>Submit</button>
                </div>
            : //displaying answer state
                <div>              
                <div className = {"text"}> {q.answer}</div>
                <button 
                  className={"button"} 
                  onClick={_this.props.actions.editAnswer.bind(_this, q.id)}>Edit</button>
                </div>;
          
      return (
          <div className={classnames("questionBox", approved, "admin")} data-index={index} key={index}>
            <h3 className = {"title"}>{q.title}</h3>
            <div className = {"submitTime"}> {q.submitTime}</div>
            {answer}                       
            <div className = {"submitter"}>submitted by: {q.submitter}</div>
            <div className = {"upvotes"}>
              <div className = {"number"}>Upvotes: {q.upvotes}</div>
            </div>
         
          <div>       
            <button className={"button"} onClick={_this.props.actions.approveQuestion.bind(_this, q.id)}>Approve</button>
            <button className={"button"} onClick={_this.props.actions.rejectQuestion.bind(_this, q.id)}>Reject</button>
          </div>
      </div>


      )
    })

    return (
      <div className={"content"}>
        <h1>Moderate Questions</h1>

        {questions}

        
        <hr />
          
        <button className = {"button"} onClick = {this.home}>Home</button>



      </div>
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Admin);