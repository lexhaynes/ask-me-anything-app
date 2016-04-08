import React from "react"
import styles from "../style.css"
import { browserHistory } from 'react-router';
import classnames from 'classnames'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import initialState from '../redux/initialState'
import constants from '../redux/constants'

export default class Profile extends React.Component {  
 constructor(props, context) {
    super(props, context)

    props.actions.displayProfile();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      picture: '',
      description: '',
    }

    this.updateState = this.updateState.bind(this);
    this.blur = this.blur.bind(this)
  }//end constructor

  getNow() {
    return new Date().toISOString();
  }

  updateState(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }

  blur(e) {
    if (e.keyCode == 13) {
      e.target.blur()
    }
  }

  goTo(path) {
    browserHistory.push('/'+ path);
  }

  render() {

     var firstName = this.props.profile.editing.firstName ?
        //editing fields state
        <div>
          <div>
            <label> First Name: </label>
            <input 
              type = "text" 
              placeholder = "First Name" 
              value = {this.state.firstName}
              onChange = {this.updateState.bind(this, "firstName")}
              onKeyDown = {this.blur}
            />
          </div>
          
            <button 
              className={styles.button} 
              onClick={_this.props.actions.updateProfile.bind(_this, "firstName", _this.state.firstName)}>Submit
            </button>
        </div>
      : //displaying fields
          <div>              
          <div className = {styles.text}> {q.answer}</div>
          <button 
            className={styles.button} 
            onClick={_this.props.actions.editAnswer.bind(_this, q.id)}>Edit</button>
          </div>;
      
    return (
      <div className={styles.content}>
        <h1>Add or Edit Profile</h1>

        {firstName}

        <div>
          <label> Last Name: </label>
          <input 
            type = "text" 
            placeholder = "Last Name" 
            value = {this.state.lasttName}
            onChange = {this.updateState.bind(this, "lastName")}
            onKeyDown = {this.blur}
          />
        </div>

        <div>
          <label> Picture: </label>
          <input 
            type = "text" 
            placeholder = "Picture" 
            value = {this.state.picture}
            onChange = {this.updateState.bind(this, "picture")}
            onKeyDown = {this.blur}
          />
        </div>


        <div>
          <label> Email: </label>
          <input 
            type = "text" 
            placeholder = "Email" 
            value = {this.state.email}
            onChange = {this.updateState.bind(this, "email")}
            onKeyDown = {this.blur}
          />
        </div>

        <div>
          <label> Description: </label>
          <input 
            type = "text" 
            placeholder = "Description" 
            value = {this.state.description}
            onChange = {this.updateState.bind(this, "description")}
            onKeyDown = {this.blur}
          />
        </div>
    
        <button
          onClick = {this.props.actions.submitProfile.bind(this, this.state)}>Submit</button>
    
      <hr />
        <button className = {styles.button} onClick = {this.goTo.bind(this, "admin")}>Admin</button>
        <button className = {styles.button} onClick = {this.goTo.bind(this, "")}>Home</button>

      </div>
    );
  }
}

export default connect(
  state => ({ currentState: state, profile: state.profile}), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Profile);