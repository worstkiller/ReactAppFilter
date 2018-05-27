import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleAppBar from './AppBarMenu';
import ThemeComponent from './ThemeComponent';
import { withStyles } from '@material-ui/core/styles';
import PreHome from './PreHome';
import Home from './Home';

const styles = {
  root: {
    flexGrow: 1,
  },
};

//component for starting of the application
function StartApp(props) {
  return (
    <div className="App">
      <SimpleAppBar />
      <PreHome onClick={props.onClickHandle} onChange={props.openDocument} />
    </div>
  );
}

//component for the after loading file in previous component
function FileLoadedApp(props) {
  return (
    <div className="App">
      <SimpleAppBar />
    </div>
  );
}

/**
 * parent component for both {@link <StartApp>} and {@link <FileLoadedApp>}
 */
class App extends Component {

  //constructor
  constructor(props) {
    super(props)
    this.state = { isFileLoaded: false };
    this.onClickHandle = this.onClickHandle.bind(this);
    this.openDocument = this.openDocument.bind(this);
  }

  /**
   * properties passed to child components and listen to their events
   */
  onClickHandle() {
    if (window.File && window.FileReader) {
      document.getElementById('filePicker').click();
      console.log("click handled for file");
    } else {
      alert("Sorry, File Reader API not supported yet in this browser, please update");
    }
  }

  openDocument(evt) {
    var files = evt.target.files;
    var singleFile = files[0];
    this.setState({ isFileLoaded: true });
    console.log("open document called " + singleFile.name);
  }

  //render method for defining the starting component
  render() {
    const isFile = this.state.isFileLoaded;
    if (isFile) {
      return (
        <FileLoadedApp {...this} />
      );
    } else {
      return (
        //temporarily disabling this
        // <StartApp {...this} />
        <div>
        <SimpleAppBar />
        <Home/>
        </div>
      );
    }
  }
}

export default ThemeComponent(withStyles(styles)(App));
