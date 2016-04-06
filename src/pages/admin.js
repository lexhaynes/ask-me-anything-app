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

export default class Admin extends React.Component {
  constructor(props) {
    super(props);    
    props.actions.displayQuestions();
  }

  home() {
      browserHistory.push('/');
  }

  render() {
    var _this = this;
    var approved = false;
    //iterate through questions. for now just initial state, later retrieved data
    var questions = this.props.questions.map(function(q, index) {
      return (
          <div className={classnames(styles.questionBox, styles["approved-true"])} data-index={index} key={index}>
            <h3 className = {styles.title}>{q.title}</h3>
            <div className = {styles.submitTime}> {q.submitTime}</div>
            <div className = {styles.answerBox}>
              <div className = {styles.text}>{q.answer.text}</div>
            </div>
            <div className = {styles.submitter}>submitted by: {q.submitter}</div>
            <div className = {styles.upvotes}>
              <div className = {styles.number}>Upvotes: {q.upvotes}</div>
            </div>
          {/* comments coming soon */}
          <div className = {styles.adminOptions}>
          
            <button className={styles.button} onClick={_this.props.actions.approveQuestion.bind(_this, q._id)}>Approve</button>
            <button className={styles.button} onClick={_this.props.actions.rejectQuestion.bind(_this, q._id)}>Reject</button>
          </div>
      </div>


      )
    })

    return (
      <div className={styles.content}>
        <h1>Moderate Questions</h1>

        {questions}

        
        <hr />
          
        <button className = {styles.button} onClick = {this.home}>Home</button>



      </div>
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Admin);