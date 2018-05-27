import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import info_back from './images/back_info.png';
import { Grow } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './App.css';

/**
 * runtime styles for components below 
 */
const styles = {
    root: {
        flexGrow: 1,
        align: 'center',
        display: 'flex',
    },
    card: {
        maxWidth: '80%',
        margin: '50px 300px 50px 300px',
        position: 'absolut',
    },
    media: {
        height: 0,
        paddingTop: '22%',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '22%',
    },
    content: {
        textAlign: "left",
    },
    actions: {
        align: 'right',
        fullWidth: 'true',
    },
    input: {
        display: 'none',
    }

};

/**
 * components for showing the main cardview with action for choosing the files
 */
class PreHome extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={info_back}
                        title="Contemplative Reptile" />
                    <CardContent position="inherit" className={classes.content}>
                        <Typography gutterBottom variant="headline" component="h2" position="inherit">
                            {this.props.title}
                        </Typography>
                        <Typography component="p" position="inherit">
                            {this.props.description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <input type="file" id="filePicker" className={classes.input} accept=".xml"
                            onChange={this.props.onChange} name="files[]" />

                        <Button size="medium" color="primary" fullWidth={false} variant="outlined"
                            onClick={this.props.onClick}>
                            {this.props.buttonText}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

//default props for message and descriptions in this component
PreHome.defaultProps = {
    title: "Welcome",
    buttonText: "Start",
    description: "Now downloading android app icons made easy and is single click away, try by uploading a appfilter file.",
};

export default withStyles(styles)(PreHome);