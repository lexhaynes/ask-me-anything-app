import React from "react"
import classnames from 'classnames'
//MUI
import ThemeManager from 'material-ui/lib/styles/getMuiTheme';
import Theme from './Theme.js'
//MUI Components
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Menu from 'material-ui/lib/svg-icons/navigation/menu'
import IconButton from 'material-ui/lib/icon-button'
 
const PageTemplate = React.createClass({  

  childContextTypes : {
        muiTheme: React.PropTypes.object
    },

  getInitialState() {
    return {
      leftNavOpen: false,

    }
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager(Theme),
    }
  },



  render() {

    var menu = 
    <IconButton>
    <Menu  
      color = {Theme.palette.primary2Color} 
    />;
    </IconButton>

    var iconMenu =  <IconMenu iconButtonElement = {menu} >     
          <MenuItem primaryText = "hello" />
          <MenuItem primaryText = "two" />
          <MenuItem primaryText = "three" />
      </IconMenu>;

    return (        
      <div className="page-content">

      {/* PAGE CONTENT  */}
      <AppBar 
        iconElementLeft = {iconMenu}
        onLeftIconButtonTouchTap = {this.toggleNav}
      />
 
        {this.props.content}

      </div>
    )
  }
})

export default PageTemplate;

