import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppIcon from './images/office-application.png';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/**
 * this styles the components 
 * @param {styles} theme 
 */
const styles = theme => ({

    card: {
        margin: 16,
        width: '60%',
        display: 'flex',
        flex: '1 1 1',
        flexFlow: "center",
        position: "absolute",
        justifyContent: "space-evenly",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 80,
        height: 80,
    },
    actions: {
        alignSelf: "right",
        flexGrow: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        alignContent: "center",
    }
});

//item layout for list in card
function SingleAppItem(props) {
    const { classes } = props;
    const downLoadLink = "https://play.google.com/store/apps/details?id=";
    console.log(props.value.attributes.component.nodeValue);

    const componentObject = {
        title: props.value.attributes.drawable.nodeValue,
        packageName: getParsedAttribute(props.value.attributes.component.nodeValue),
    };

    //this returns a string parsed from component attribute
    function getParsedAttribute(input) {
        return input.substring(input.indexOf("{") + 1, input.indexOf("/"));
    }

    function processRequest(evt) {
        console.log(evt.target);
    }

    return (
        <ListItem button>
            <CardMedia className={classes.cover} image={AppIcon} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="headline">{componentObject.title}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                        {componentObject.packageName}
                    </Typography>
                </CardContent>
            </div>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary" onClick={processRequest}>
                    Download
                    </Button>
            </CardActions>
        </ListItem>
    )
}

/**
 * this returns the base 64 image 
 * @param {img} img 
 */
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

/**
 * this returns a list items component
 */
class Home extends React.Component {

    render() {
        var array = this.props.appFilter.appFilter;
        const { classes } = this.props;

        if (array.getElementsByTagName("item") != null) {
            const itemArray = array.getElementsByTagName("item");
            var list = Array.from(itemArray);

            return (
                <div>
                    <List className={classes.root}>
                        {list.map(singleItem => (
                            <Card key={singleItem.attributes.component.nodeValue}>
                                <SingleAppItem {...this.props} value={singleItem} />
                            </Card>
                        ))}
                    </List>
                </div>
            );

        } else {
            return <h3>No Items found</h3>
        }
    }
}

export default withStyles(styles, { withTheme: true })(Home);