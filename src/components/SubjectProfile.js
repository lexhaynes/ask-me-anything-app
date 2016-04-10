import React from "react"
import { browserHistory } from 'react-router';
import classnames from 'classnames'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import initialState from '../redux/initialState'
import constants from '../redux/constants'
//MUI
import TextField from 'material-ui/lib/text-field' 
import RaisedButton from 'material-ui/lib/raised-button' 

/* TODO: LINK THIS COMPONENT TO STATE AND DB SOON*/

export default class SubjectProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Hi! I'm Aziz Ansari. Ask me anything...",
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      mode: this.props.mode
    }
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDescription = this.updateDescription.bind(this)   
    this.submit = this.submit.bind(this)   
    this.edit = this.edit.bind(this)   

  }

  updateTitle(e) {
    this.setState({
      title: e.target.value
    })  
  }

  updateDescription(e) {
    this.setState({
      description: e.target.value
    })  
  }

  submit() {
     this.setState({
      mode: "view"
    }) 
  }

  edit() {
     this.setState({
      mode: "edit"
    }) 
  }


  
  render() {

    //return live view or edit view depending on the mode
    const editButton = this.props.admin ?  
    <RaisedButton
          className= "button" 
          onClick={this.edit}
          label = "Edit"
          primary = {true}
        /> : <span></span>;

    const content = this.state.mode === "edit" ?
    <div className = {classnames("admin", "profile")}>
      <TextField 
          hintText = "Introduce Yourself" 
          floatingLabelText = "Introduce Yourself"
          defaultValue = {this.state.title}
          value = {this.state.title}
          onChange = {this.updateTitle}
          multiLine = {true}
          fullWidth = {true}
        />

        <TextField 
          hintText = "Description" 
          floatingLabelText = "Description"
          defaultValue = {this.state.description}
          value = {this.state.description}
          onChange = {this.updateDescription}
          multiLine = {true}
          rows = {4}
          fullWidth = {true}
        />
       
        <RaisedButton
          className= "button" 
          onClick={this.submit}
          label = "Submit"
          primary = {true}
        />
    </div>
      :
    <div className = {classnames("subjectProfile", "center")}>
      <h2>{this.state.title}</h2>

      <p>{this.state.description}</p>

      {editButton}

      </div>;

    return (
      <div>
      {content}
      </div>
    
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(SubjectProfile);