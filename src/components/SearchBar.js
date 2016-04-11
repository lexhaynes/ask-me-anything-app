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
import IconButton from 'material-ui/lib/icon-button'



export default class SubjectProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      display: "none"
     }
    this.updateQuery = this.updateQuery.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);

  }

  updateQuery(e) {
    this.setState({
      query: e.target.value,
    })  
    //filter questions
    this.props.actions.filterQuestions(e.target.value);
  }

  toggleSearch() {
    if (this.state.display === "none") {
      this.setState({
      display: "inline-block",
    })  
    } else {
      this.setState({
        display: "none",
      })  
    }
  }

  render() {

    return (
      <div id = "searchField">
        <IconButton
          iconClassName = "fa fa-search"
          onClick = {this.toggleSearch}
        />
        <TextField 
          id = "searchText"
          hintText="Search" 
          hintStyle = {{color:"#fff"}}
          value = {this.state.query}
          onChange = {this.updateQuery}
          style = {{display: this.state.display}}
          />
      </div>
    
    );
  }
}

export default connect(
  state => ({ currentState: state, questions: state.questions }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(SubjectProfile);