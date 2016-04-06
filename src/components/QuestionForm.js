import React from 'react'
import styles from "../style.css"
import { browserHistory } from 'react-router'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'

export default class QuestionForm extends React.Component {
  //same as getInitialState()
  constructor(props, context) {
    super(props, context)

    this.state = {
      title: '',
      submitTime: this.getNow(),
      submitter: ''
    }

    this.updateTitle = this.updateTitle.bind(this);
    this.updateSubmitter = this.updateSubmitter.bind(this);

    this.blur = this.blur.bind(this)
  }//end constructor

  getNow() {
    return new Date().toISOString();
  }

  goBack() {
    browserHistory.push('/');
  }

  updateTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  updateSubmitter(e) {
    this.setState({
      submitter: e.target.value
    })
  }

  blur(e) {
    if (e.keyCode == 13) {
      e.target.blur()
    }
  }

  render() {
  
    return (
      <div className={styles.questionForm}>
        <h1>Question Form </h1>

       <div>
          <label> Ask a question: </label>
          <input 
            type = "text" 
            placeholder = "Ask a question" 
            value = {this.state.title}
            onChange = {this.updateTitle}
            onKeyDown = {this.blur}
          />
        </div>

        <div>
          <label> Your name: </label>
          <input 
            type = "text" 
            placeholder = "Your name" 
            value = {this.state.submitter}
            onChange = {this.updateSubmitter}
            onKeyDown = {this.blur}
          />
        </div>

        <button
          onClick = {this.props.actions.submitQuestion.bind(this, this.state.title, this.state.submitTime, this.state.submitter)}
        >Submit</button>

      {/*<button 
        className={styles.button} 
        onClick={this.goBack}>Back to Questions</button>*/}

      </div>
    );
  }
}


export default connect(
	state => ({ questions: state.questions }), 
	dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(QuestionForm);