import React from "react"
import styles from "../style.css"
import { browserHistory } from 'react-router';
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import initialState from '../redux/initialState'
import QuestionForm from '../components/QuestionForm'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    props.actions.displayQuestions();
  }

  askQuestion() {
    browserHistory.push('/ask');
  }


  render() {
    var _this = this;
    //iterate through questions. for now just initial state, later retrieved data
    var questions = this.props.questions.map(function(q, index) {
      return (
          <div className={styles.questionBox} data-index={index} key={index}>
            <h3 className = "title">{q.title}</h3>
            <div className = "submitTime">{q.submitTime}</div>
            <div className = "answerBox">
              <div className = "text">{q.answer.text}</div>
            </div>
            <div className = "submitter">{q.submitter}</div>
            <div className = "upvotes">
              <i className="fa fa-chevron-up" onClick = {_this.props.actions.upvoteQuestion.bind(_this, index)}></i>
              <i className="fa fa-chevron-down" onClick = {_this.props.actions.downvoteQuestion.bind(_this, index)}></i>
              <div className = "number">{q.upvotes}</div>
            </div>
            <div className = "options">
                <i className="fa fa-trash" onClick = {_this.props.actions.deleteQuestion.bind(_this, index)}></i>
                <i className="fa fa-pencil" onClick = {_this.props.actions.editQuestion.bind(_this, index)}></i>
            </div>
          {/* comments coming soon */}
      </div>


      )
    })

    return (
      <div className={styles.content}>
        <h1>AMA</h1>

        {questions}

        {/* <button className={styles.button} onClick={this.askQuestion}>Ask a Question</button> */}

        
          <QuestionForm />


      </div>
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Home);