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
  profile() {
      browserHistory.push('/profile');
  }

  render() {
   var _this = this;
    var approved = false;
    var questions = this.props.questions.map(function(q, index) {
    var answer = q.editingAnswer ?
              //editing answer state
                <div>
                <input type = "text" placeholder = "Answer Question" defaultValue = {_this.props.questions[index].answer} value = {_this.state.answers[index]} onChange = {_this.updateAnswer.bind(_this, index)} />
                <button 
                  className={styles.button} 
                  onClick={_this.props.actions.submitAnswer.bind(_this, q.id,  _this.state.answers[index])}>Submit</button>
                </div>
            : //displaying answer state
                <div>              
                <div className = {styles.text}> {q.answer}</div>
                <button 
                  className={styles.button} 
                  onClick={_this.props.actions.editAnswer.bind(_this, q.id)}>Edit</button>
                </div>;
          
      return (
          <div className={classnames(styles.questionBox, styles["approved-true"])} data-index={index} key={index}>
            <h3 className = {styles.title}>{q.title}</h3>
            <div className = {styles.submitTime}> {q.submitTime}</div>
            {answer}                       
            <div className = {styles.submitter}>submitted by: {q.submitter}</div>
            <div className = {styles.upvotes}>
              <div className = {styles.number}>Upvotes: {q.upvotes}</div>
            </div>
         
          <div className = {styles.adminOptions}>       
            <button className={styles.button} onClick={_this.props.actions.approveQuestion.bind(_this, q.id)}>Approve</button>
            <button className={styles.button} onClick={_this.props.actions.rejectQuestion.bind(_this, q.id)}>Reject</button>
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
        <button className = {styles.button} onClick = {this.profile}>Add Profile</button>



      </div>
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Admin);