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
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button' 



export default class QuestionForm extends React.Component {
  //same as getInitialState()
  constructor(props, context) {
    super(props, context)

    this.state = {
      title: '',
      submitTime: this.getNow(),
      submitter: '',
      errorTitle: '',
      errorUser: '',
    }

    this.updateTitle = this.updateTitle.bind(this);
    this.updateSubmitter = this.updateSubmitter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateErrorTitle =  this.updateErrorTitle.bind(this);
    this.updateErrorUser =  this.updateErrorUser.bind(this);
    this.toggleForm =  this.toggleForm.bind(this);

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

  updateErrorTitle() {
    this.setState({
      errorTitle: 'Please enter a valid question.'
    })
  }  
  updateErrorUser() {
    this.setState({
      errorUser: 'Please enter a valid username.'
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

 
  handleClick() {
    //check that vals are not empty
      if (this.state.title.length < 1) {
        this.updateErrorTitle();
      } else {
        this.setState({
          errorTitle: ''
        })   
      }

      if (this.state.submitter.length < 1) {
        this.updateErrorUser();
      } else {
        this.setState({
          errorUser: ''
        })   
      }

  if (this.state.title.length > 1 && this.state.submitter.length > 1 ) {
      this.props.actions.submitQuestion(
          this.state.title, 
          this.state.submitTime, 
          this.state.submitter
        )
      this.props.toggleForm();
    }
  }

  toggleForm() {
    //refresh error state so when re-opened we don't get errors
    this.setState({
      errors: true,
      errorUser: '',
      errorTitle: ''
    })    
    this.props.toggleForm();
  }

  render() {
    const modalActions = [
        <FlatButton
        label="Cancel"
        secondary={true}
        labelStyle = {{color:"#E24714"}}
        onTouchTap={this.toggleForm}
      />,
        <RaisedButton
          label= "Submit Question"
          style = {{margin: "0 20px 20px 6px"}}
          primary = {true}
          onClick = {this.handleClick} />
    ];

    return (

      <Dialog
      title="Ask a Question..."
      actions={modalActions}
      modal={false}
      open = {this.props.visibility}
      onRequestClose= {this.toggleForm}
      className = "questionForm"
    >

       <div>
        <i className = "fa fa-question-circle"></i>
          <TextField 
            hintText = "Ask a Question" 
            errorText={this.state.errorTitle}
            multiline = {true}
            value = {this.state.title}
            onChange = {this.updateTitle}
            onKeyDown = {this.blur}
            style = {{width:"94%"}}
          />
        </div>
        <br />
        <div>
          <i className = "fa fa-user"></i>

          <TextField 
            hintText = "Your name" 
            errorText={this.state.errorUser}
            value = {this.state.submitter}
            onChange = {this.updateSubmitter}
            onKeyDown = {this.blur}
            style = {{width:"94%"}}
          />
        </div>
 

      </Dialog>
    );
  }
}


export default connect(
	state => ({ questions: state.questions }), 
	dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(QuestionForm);