import React from 'react'
import { browserHistory } from 'react-router'
import classnames from 'classnames'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
//MUI
import AppBar from 'material-ui/lib/app-bar' 
import Paper from 'material-ui/lib/paper' 


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
      <div className = {classnames("questionForm", this.props.display)}>
         <AppBar 
          iconClassNameLeft = "fa fa-times"
        />
      <Paper className={classnames("paper")}>
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
          onClick = {this.props.actions.submitQuestion.bind(
            this, 
            this.state.title, 
            this.state.submitTime, 
            this.state.submitter
          )}>Submit</button>

        <button onClick = {this.props.closeForm}>Close</button>

      </Paper> 
      </div>
    );
  }
}


export default connect(
	state => ({ questions: state.questions }), 
	dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(QuestionForm);