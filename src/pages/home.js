import React from "react"
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
import SubjectProfile from '../components/SubjectProfile'
//MUI Components
import Paper from 'material-ui/lib/paper' 
import RaisedButton from 'material-ui/lib/raised-button' 
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import TextField from 'material-ui/lib/text-field' 


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    props.actions.displayQuestions();
    this.state = {
      questionFormVisibility: "hidden",
      questions: [""],
      fabIcon: "fa fa-plus",
      fabClicked: false
    }
    this.toggleQuestionForm = this.toggleQuestionForm.bind(this);
  }
  updateQuestion(index, e) {
      var updated = this.props.questions.map(function(q, i) {
        return i === index ? e.target.value : q.title
    });
    this.setState({
      questions: updated
    })
  }

  toggleQuestionForm() {
    if (!this.state.fabClicked) {
        this.setState({
          fabClicked: true,
          fabIcon: "fa fa-times",
          questionFormVisibility: "block"
      })
    }
    else {
      this.setState({
        fabClicked: false,
        fabIcon: "fa fa-plus",
        questionFormVisibility: "hidden"
      })
  }
}


  render() {
    var _this = this;
    var approved = false;

    var questions = this.props.questions.map(function(q, index) {
      approved = "approved-" + String(q.approvalStatus === constants.QUESTION_APPROVED);
          var question = q.editingQuestion ?
              //editing question state
                <div>
                <TextField 
                  hintText = "Ask Question" 
                  defaultValue = {_this.props.questions[index].title} 
                  value = {_this.state.questions[index]}
                  onChange = {_this.updateQuestion.bind(_this, index)}
                  multiline = {true}
                  fullWidth = {true}
                />
               
                <br />
                <RaisedButton 
                  onClick={_this.props.actions.updateQuestion.bind(_this, q.id,  _this.state.questions[index])}
                  label = "Submit"
                  primary = {true}
                />
                </div>
            : //displaying question state
                <div>              
                <h4 className = {"title"}> {q.title}</h4>
                </div>;

      return (
        <Paper 
          className = {classnames("paper", "questionBox")}
          key={index} 
       >
          <div className={classnames(approved)} data-index={index} key={index}>
            {question}

            {/*<div className = {"submitTime"}> {q.submitTime}</div>*/}
            <div className = {"answer"}>{q.answer}</div>

            <div className = "meta">
              <div className = {classnames("left", "submitter")}>{q.submitter}</div>
              <div className = {classnames("right", "upvotes")}>
                <i className = {classnames("clickable", "fa fa-star")} 
                  onClick = {_this.props.actions.upvoteQuestion.bind(_this, index)}></i>
                <span className = {"number"}>{q.upvotes}</span>
              </div>
              <div className = "clear"></div>
            </div>

            <div className = {"options"}>
                 <i 
                  className={classnames("clickable", "fa fa-pencil")} 
                  onClick={_this.props.actions.editQuestion.bind(_this, q.id)}></i>
                
                <i className = {classnames("clickable", "fa fa-trash")} onClick = {_this.props.actions.deleteQuestion.bind(_this, q.id)}></i>
            </div>
        </div>
      </Paper>


      )
    })

    return (

      <PageTemplate content = {
          <div>

            <QuestionForm 
                display = {this.state.questionFormVisibility} 
                closeForm = {this.toggleQuestionForm} 
              />

            <SubjectProfile />
            
            <div className = "questionsContainer">
            {questions}
            </div>
            
             
            <div className = "fixed-right">
              <FloatingActionButton
                  iconClassName = {this.state.fabIcon}
                  primary = {true}
                  onClick = {this.toggleQuestionForm} />
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