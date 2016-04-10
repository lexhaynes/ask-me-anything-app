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
import TextField from 'material-ui/lib/text-field' 
import RaisedButton from 'material-ui/lib/raised-button' 



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
    var _this = this;
    return (
      <div className = {classnames("questionForm", this.props.display)}>
         <AppBar 
          iconClassNameLeft = "fa fa-times"
          onLeftIconButtonTouchTap = {this.props.closeForm}
        />
      <Paper className={classnames("paper")}>

       <div>
        <i className = "fa fa-question-circle"></i>
          <TextField 
            hintText = "Ask a question" 
            multiline = {true}
            value = {this.state.title}
            onChange = {this.updateTitle}
            onKeyDown = {this.blur}
            style = {{width:"90%"}}
          />
        </div>
        <br />
        <div>
          <i className = "fa fa-user"></i>

          <TextField 
            hintText = "Your name" 
            value = {this.state.submitter}
            onChange = {this.updateSubmitter}
            onKeyDown = {this.blur}
          />
        </div>
        <RaisedButton
          label= "Submit Question"
          style = {{marginTop: "40px"}}
          primary = {true}
          onClick = {this.props.actions.submitQuestion.bind(
            this, 
            this.state.title, 
            this.state.submitTime, 
            this.state.submitter
          )} />

      </Paper> 
      </div>
    );
  }
}


export default connect(
	state => ({ questions: state.questions }), 
	dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(QuestionForm);