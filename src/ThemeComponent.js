import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
      primary: {
        light:orange[300],
        main: orange[500],
        dark: orange[700],
      },
      secondary: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
    },
  });   
  
  function ThemeComponent(Component) {
    function ThemeComponent(props) {
      // MuiThemeProvider makes the theme available down the React tree
      // thanks to React context.
      return (
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      );
    }
  
    return ThemeComponent;
  }
  
  export default ThemeComponent;