import React from "react"
import classnames from 'classnames'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import initialState from '../redux/initialState'
import constants from '../redux/constants'
//components
import PageTemplate from '../components/PageTemplate'
import QuestionForm from '../components/QuestionForm'
import SubjectProfile from '../components/SubjectProfile'
import SearchBar from '../components/SearchBar'
//MUI Components
import Paper from 'material-ui/lib/paper' 
import RaisedButton from 'material-ui/lib/raised-button' 
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import TextField from 'material-ui/lib/text-field' 
import IconButton from 'material-ui/lib/icon-button'
//CARD
//Card
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    props.actions.displayQuestions();
    this.state = {
      questionFormVisibility: false,
      questions: [""],
    }
    this.toggleQuestionForm = this.toggleQuestionForm.bind(this);

  }
  updateQuestion(index, e) {
      var updated = this.props.questions.map(function(q, i) {
        return i === index ? e.target.value : q.title
    });
    this.setState({
      questions: updated
    })
  }

  toggleQuestionForm() {
    if (this.state.questionFormVisibility === false) {
        this.setState({
          questionFormVisibility: true,
      })
    }
    else {
      this.setState({
        questionFormVisibility: false,
      })
  }
}


  render() {
    var _this = this;
    var approved = false;
    //we're iterating through an on-the-fly created copy of state
    var questions = this.props.filtered.map(function(q, index) {
      approved = "approved-" + String(q.approvalStatus === constants.QUESTION_APPROVED);
          var question = q.editingQuestion ?
              //editing question state
                <div>
                <TextField 
                  hintText = "Ask Question" 
                  defaultValue = {q.title || _this.state.questions[index]} 
                  value = {_this.state.questions[index]}
                  onChange = {_this.updateQuestion.bind(_this, index)}
                  multiline = {true}
                  fullWidth = {true}
                  floatingLabelText = "Edit Question"
                />
              
              <FlatButton 
              className = "button"
              onClick={_this.props.actions.updateQuestion.bind(_this, q.id, _this.state.questions[index])} 
              label  = "Submit"
              primary = {true}
            />
            <FlatButton 
              className = "button"
              labelStyle = {{color:"#E24714"}}
              onClick={_this.props.actions.cancelEditQuestion.bind(_this, q.id)}
              label  = "Cancel"
              primary = {true}
            />
                </div>
            : //displaying question state
                <div>              
                <h4 className = {"title"}> {q.title}</h4>
                </div>;
      return (

    <Card 
          data-index={index}
          className = {classnames("paper", "questionBox", approved)}
          key={index} >
    <CardHeader
      title={q.submitter}
      subtitle={q.submitTime}
      avatar={q.photo}
    />
    <CardTitle 
      style = {{paddingTop:0, paddingBottom:0}}
      title={question}
    />
    <CardText
      style = {{paddingTop:0, paddingBottom:0}}
    >     
          {q.answer || <div className="disabled">Not yet answered.</div>}
            <div className = "meta">
                <i className = {classnames("clickable", "fa fa-star")} 
                  onClick = {_this.props.actions.upvoteQuestion.bind(_this, q.id)}></i>
                <span className = {"number"}>{q.upvotes}</span>
            </div>
    </CardText>
    <CardActions>
        <i className={classnames("clickable", "fa fa-pencil")} 
                  onClick={_this.props.actions.editQuestion.bind(_this, q.id)}></i>
        
        <i className = {classnames("clickable", "fa fa-trash")} onClick = {_this.props.actions.deleteQuestion.bind(_this, q.id)}></i>
    </CardActions>
  </Card>


      )
    })

    return (

      <PageTemplate 
      elementRight = {<SearchBar />}
      elementRightClick = {this.toggleSearch}
      content = {
          <div>        
             <QuestionForm 
                visibility = {this.state.questionFormVisibility}
                toggleForm = {this.toggleQuestionForm}

             />
              
              <SubjectProfile />
              
              <div className = "questionsContainer">
              {questions}
              </div>
              
               
              <div className = "fixed-right">
                <FloatingActionButton
                    iconClassName = "fa fa-plus"
                    primary = {true}
                    onClick = {this.toggleQuestionForm} />
              </div>
            </div>
      } />
    
    );
  }
}

export default connect(
  state => ({ 
    currentState: state, 
    questions: state.questions, 
    //here we create a filtered version of state on the fly instead of directly mutating state
    filtered: state.questions.filter((q) => {
        if (q.title != null) 
        return q.title.toLowerCase().indexOf(state.searchTerm) > -1
    }) 
  }), 
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Home);


