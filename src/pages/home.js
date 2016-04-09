import React from "react"
import { browserHistory } from 'react-router';
import classnames from 'classnames'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import initialState from '../redux/initialState'
import constants from '../redux/constants'
//components
import PageTemplate from '../components/PageTemplate'
import QuestionForm from '../components/QuestionForm'


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    props.actions.displayQuestions();
    this.state = {
      questionFormVisibility: "hidden",
      questions: [""]
    }
    this.showQuestionForm = this.showQuestionForm.bind(this);
    this.hideQuestionForm = this.hideQuestionForm.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }
  updateQuestion(index, e) {
      var updated = this.props.questions.map(function(q, i) {
        return i === index ? e.target.value : q.title
    });
    this.setState({
      questions: updated
    })
  }

  adminLogin() {
    browserHistory.push('/admin');
  }

  showQuestionForm() {
    this.setState({
      questionFormVisibility: "block"
    })
  }
  hideQuestionForm() {
    this.setState({
      questionFormVisibility: "hidden"
    })
  }

  render() {
    var _this = this;
    var approved = false;
    var questions = this.props.questions.map(function(q, index) {
      approved = "approved-" + String(q.approvalStatus === constants.QUESTION_APPROVED);
          var question = q.editingQuestion ?
              //editing question state
                <div>
                <input type = "text" placeholder = "Ask Question" defaultValue = {_this.props.questions[index].title} value = {_this.state.questions[index]} onChange = {_this.updateQuestion.bind(_this, index)} />
                <button 
                  className={"button"} 
                  onClick={_this.props.actions.updateQuestion.bind(_this, q.id,  _this.state.questions[index])}>Submit</button>
                </div>
            : //displaying question state
                <div>              
                <h3 className = {"title"}> {q.title}</h3>
                <button 
                  className={"button"} 
                  onClick={_this.props.actions.editQuestion.bind(_this, q.id)}>Edit</button>
                </div>;

      return (
          <div className={classnames("questionBox", approved)} data-index={index} key={index}>

            {question}

            <div className = {"submitTime"}> {q.submitTime}</div>
            <div className = {"answerBox"}>
              <div className = {"text"}><strong>Answer: </strong>{q.answer}</div>
            </div>
            <div className = {"submitter"}>submitted by: {q.submitter}</div>
            <div className = {"upvotes"}>
              <i className = {classnames("clickable", "fa fa-chevron-up")} onClick = {_this.props.actions.upvoteQuestion.bind(_this, index)}></i>
              <i className = {classnames("clickable", "fa fa-chevron-down")} onClick = {_this.props.actions.downvoteQuestion.bind(_this, index)}></i>
              <div className = {"number"}>{q.upvotes}</div>
            </div>
            <div className = {"options"}>
                <i className = {classnames("clickable", "fa fa-trash")} onClick = {_this.props.actions.deleteQuestion.bind(_this, q.id)}></i>
            </div>
      </div>


      )
    })

    return (

      <PageTemplate content = {
        <div className="mdl-grid">      
          <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset-desktop">
              <p>{this.props.currentState.requestStatus}</p>
              {questions}
              
                <QuestionForm 
                  display = {this.state.questionFormVisibility} 
                  closeForm = {this.hideQuestionForm} 
                />

                <hr />
                
                <button className = {"button"} onClick = {this.showQuestionForm}>Ask Question</button>

                <button className = {"button"} onClick = {this.adminLogin}>Admin Login</button>
          </div>
        </div>
      } />
    
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Home);