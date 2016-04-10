import React from "react"
import { browserHistory } from 'react-router'
import classnames from 'classnames'
//MUI
import ThemeManager from 'material-ui/lib/styles/getMuiTheme'
import Theme from './Theme.js'
//MUI Components
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
 
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

    var tabs = this.props.tabs.map((tab, index) => {
      return (
        
        <Tab 
          key = {index}
          label = {tab.label} 
          icon = {tab.icon}
          onActive = {tab.onActive}>
        {tab.content}
        </Tab>

      )
    })  


    return (        
      <div className="admin-content">

        {/* ADMIN CONTENT  */}
    <Tabs>       
      {tabs}
    </Tabs>


 

      </div>
    )
  }
})

export default PageTemplate;

