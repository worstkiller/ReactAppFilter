import React, { Component } from 'react';
import './App.css';
import SimpleAppBar from './AppBarMenu';
import ThemeComponent from './ThemeComponent';
import { withStyles } from '@material-ui/core/styles';
import PreHome from './PreHome';
import MainComponent from './MainComponent';

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
      <SimpleAppBar/>
      <MainComponent appFilter={props} />
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
    this.state = { isFileLoaded: false, appFilter: undefined };
    this.onClickHandle = this.onClickHandle.bind(this);
    this.openDocument = this.openDocument.bind(this);
  }

  /**
   * properties passed to child components and listen to their events
   */
  onClickHandle() {
    if (window.File && window.FileReader) {
      document.getElementById('filePicker').click();
    } else {
      alert("Sorry, File Reader API not supported yet in this browser, please update");
    }
  }

  /**
   * This parses the files and creates a XML DOM and set the state to refresh things
   * @param {Input} evt 
   */
  openDocument(evt) {
    var files = evt.target.files;
    var singleFile = files[0];
    var fileReader = new FileReader();
    var localState = this;

    fileReader.onload = function (e) {
      var stringData = e.target.result;
      var parser = new DOMParser(stringData)
      var xmlData = parser.parseFromString(stringData, "text/xml");
      localState.setState({ isFileLoaded: true ,appFilter:xmlData});
    };
    fileReader.readAsText(singleFile);
  }

  //render method for defining the starting component
  render() {
    const isFile = this.state.isFileLoaded;
    if (isFile) {
      return (
        <FileLoadedApp {...this.state} />
      );
    } else {
      return (
        <StartApp {...this} />
      );
    }
  }
}

export default ThemeComponent(withStyles(styles)(App));
