import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleAppBar from './AppBarMenu';
import ThemeComponent from './ThemeComponent';
import { withStyles } from '@material-ui/core/styles';
import PreHome from './PreHome';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {

  //constructor
  constructor(props) {
    super(props)
  }

  /**
   * properties passed to child components and listen to their events
   */
  childProps = {
    onClickHandle: function () {
      document.getElementById('filePicker').click();
      console.log("click handled for file");
    },
    openDocument: function (event) {
      console.log("open document called"+event);
    }
  }

  //render method for defining the starting component
  render() {
    return (
      <div className="App">
        <SimpleAppBar />
        <PreHome handClick={this.childProps} />
      </div>
    );
  }
}

export default ThemeComponent(withStyles(styles)(App));
