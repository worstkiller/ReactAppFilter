import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

//main toolbar component for showing the tab at top of screen
class SimpleAppBar extends React.Component {

  render() {

    const localProps = this.props;

    console.log(localProps);

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {localProps.name}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );

  }

}

SimpleAppBar.defaultProps = {name:"Appfilter"};

//default props for required elements
SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
