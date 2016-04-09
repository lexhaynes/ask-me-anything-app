import React from "react"
//MUI
import ThemeManager from 'material-ui/lib/styles/getMuiTheme';
import Theme from './Theme.js'
//MUI Components
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'


const PageTemplate = React.createClass({  

  childContextTypes : {
        muiTheme: React.PropTypes.object
    },

  getInitialState() {
    return {
      leftNavOpen: false
    }
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager(Theme),
    }
  },

  toggleNav() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen
    })
  },


  render() {
    return (        
      <div className="page-content">

      {/* PAGE CONTENT  */}
      <AppBar 
        onLeftIconButtonTouchTap = {this.toggleNav}
      />
      <LeftNav 
        open = {this.state.leftNavOpen}
        docked = {false}
        onRequestChange = {this.toggleNav}
      />
        {this.props.content}
      {/* END PAGE CONTENT  */}

      </div>
    )
  }
})

export default PageTemplate;

