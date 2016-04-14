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
      title: "We are Aziz Ansari and Alan Yang from Master of None - Ask Us Anything",
      description: "It's Aziz Ansari. I'm here to chat about my new Netflix series Master of None. I have my co-creator/writer Alan Yang (/u/ItsAlanYang) with me here too. We are so humbled by how much you guys have supported the show's first season. The online community has been so nice to the show. So thank you!",
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