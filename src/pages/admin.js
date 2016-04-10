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
//MUI
import PageTemplate from '../components/PageTemplate'
import Paper from 'material-ui/lib/paper' 
import RaisedButton from 'material-ui/lib/raised-button' 
import FlatButton from 'material-ui/lib/flat-button' 
import TextField from 'material-ui/lib/text-field' 

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
    var approved = "approval-pending";
    var questions = this.props.questions.map(function(q, index) {
    
      if (q.approvalStatus == "QUESTION_APPROVED") {
        approved = "approved";
      } else if (q.approvalStatus == "QUESTION_REJECTED") {
        approved = "approval-rejected"
      }

        console.log(q.approvalStatus)
      console.log(approved);
  
      var answerLabel = _this.props.questions[index].answer === "" ? "Answer Question" : "Edit Answer";

      var answer = q.editingAnswer ?
              //editing answer state
                <div>
                <TextField
                   hintText = "Answer Question" 
                   defaultValue = {_this.props.questions[index].answer} 
                   value = {_this.state.answers[index]} 
                   fullWidth = {true}
                   onChange = {_this.updateAnswer.bind(_this, index)} 
                />
                  <RaisedButton
                  className = "button"
                  label = "Submit"
                  primary = {true}
                  onClick={_this.props.actions.submitAnswer.bind(_this, q.id,  _this.state.answers[index])} />
                </div>
            : //displaying answer state
                <div>              
                <div className = {"text"}> {q.answer}</div>
                <RaisedButton 
                  className = "button"
                  primary = {true}
                  label = {answerLabel}
                  onClick={_this.props.actions.editAnswer.bind(_this, q.id)} />
                </div>;
          
      return (
        <Paper 
          className = {classnames("paper", "questionBox", "admin", approved)}
          key={index}
          data-index={index} 
          key={index} >
         
            <h3 className = {"title"}>{q.title}</h3>                      
            <div className = {"submitter"}>Submitted by: {q.submitter}</div>
            <div className = {"upvotes"}>
              <div className = {"number"}>Upvotes: {q.upvotes}</div>
            </div>
         
              {answer} 

          <div>       
            <FlatButton 
              className = "button"
              labelStyle = {{color:"#51BB05"}}
              onClick={_this.props.actions.approveQuestion.bind(_this, q.id)} 
              label  = "Approve"
              primary = {true}
            />
            <FlatButton 
              className = "button"
              labelStyle = {{color:"#E24714"}}
              onClick={_this.props.actions.rejectQuestion.bind(_this, q.id)}
              label  = "Reject"
              primary = {true}
            />
          </div>
      </Paper>


      )
    })

    var home =  <FlatButton 
              onClick={this.home}
              label  = "Home"
              primary = {true}
            />;

    return (
       <PageTemplate 
       elementRight = {home}
       elementRightClick = {this.home} 
       content = {
          <div className = {classnames("admin", "questionsContainer")}>
          {questions}  
        <RaisedButton 
          className = "button"
          label  = "Home"
          primary = {true}
          onClick = {this.home}
        />
        </div>
      }
      />
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Admin);