import React from "react"
import styles from "../style.css"
import { browserHistory } from 'react-router';
import classnames from 'classnames'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import initialState from '../redux/initialState'
import QuestionForm from '../components/QuestionForm'
import constants from '../redux/constants'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    props.actions.displayQuestions();
    this.state = {
      questionFormVisibility: "hidden"
    }
    this.showQuestionForm = this.showQuestionForm.bind(this);
    this.hideQuestionForm = this.hideQuestionForm.bind(this);
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
    //iterate through questions. for now just initial state, later retrieved data
    var questions = this.props.questions.map(function(q, index) {
      approved = "approved-" + String(q.approvalStatus === constants.QUESTION_APPROVED);
      return (
          <div className={classnames(styles.questionBox, styles[approved])} data-index={index} key={index}>
            <h3 className = {styles.title}>{q.title}</h3>
            <div className = {styles.submitTime}> {q.submitTime}</div>
            <div className = {styles.answerBox}>
              <div className = {styles.text}>{q.answer.text}</div>
            </div>
            <div className = {styles.submitter}>submitted by: {q.submitter}</div>
            <div className = {styles.upvotes}>
              <i className = {classnames(styles.clickable, "fa fa-chevron-up")} onClick = {_this.props.actions.upvoteQuestion.bind(_this, index)}></i>
              <i className = {classnames(styles.clickable, "fa fa-chevron-down")} onClick = {_this.props.actions.downvoteQuestion.bind(_this, index)}></i>
              <div className = {styles.number}>{q.upvotes}</div>
            </div>
            <div className = {styles.options}>
                <i className = {classnames(styles.clickable, "fa fa-trash")} onClick = {_this.props.actions.deleteQuestion.bind(_this, index)}></i>
                {/*<i className="fa fa-pencil" onClick = {_this.props.actions.editQuestion.bind(_this, index)}></i>*/}
            </div>
          {/* comments coming soon */}
      </div>


      )
    })

    return (
      <div className={styles.content}>
        <h1>{this.props.currentState.requestStatus}</h1>
        {questions}
        
          <QuestionForm display = {this.state.questionFormVisibility} closeForm = {this.hideQuestionForm} />

          <hr />
          
          <button className = {styles.button} onClick = {this.showQuestionForm}>Ask Question</button>

          <button className = {styles.button} onClick = {this.adminLogin}>Admin Login</button>

      </div>
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Home);