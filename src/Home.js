import React from 'react';
import ReactDOM from 'react-dom';
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

const downLoadLink = "https://play.google.com/store/apps/details?id=";
const PATTERN_THIRD = "<img\\s+(.*?)src=\\\"https:\\/\\/\\S.*?\\\"\\s+(.*?)alt=\\\"Cover art\\\"(.*?)>";
const PATTERN_THIRD_URL = "https:\\/\\/\\S.*?(=?)(\\S.*?)\"\\s";

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
    },
    anchor: {
        textDecoration: "none"
    }
});


//item layout for list in card
function SingleAppItem(props) {
    const { classes } = props;
    console.log(props);

    return (
        <ListItem >
            <img crossOrigin="Anonymous" id={props.value.packageName} className={classes.cover} src={AppIcon}
                onLoad={props.onMediaLoaded.bind(this, props.value)} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="headline">{props.value.title}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                        {props.value.packageName}
                    </Typography>
                </CardContent>
            </div>
            <CardActions className={classes.actions}>
                <a className={classes.anchor} download={props.value.title + ".png"} id={props.value.title + props.value.packageName}>
                    <Button
                        size="small" color="primary">
                        Download
                    </Button>
                </a>
            </CardActions>
        </ListItem>
    )
}

/**
 * this returns a list items component
 */
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.setState = { urlUpdated: "" };
        this.processRequest = this.processRequest.bind(this);
        this.urlExtractor = this.urlExtractor.bind(this);
    }

    options = {
        method: 'get',
        headers: {
            "Allow-Control-Allow-Origin": "*",
        },
    }

    //this returns a string parsed from component attribute
    getParsedAttribute(input) {
        return input.substring(input.indexOf("{") + 1, input.indexOf("/"));
    }

    //this returns a component object with title and package name
    getComponentObject(singleItem) {
        return {
            title: singleItem.attributes.drawable.nodeValue,
            packageName: this.getParsedAttribute(singleItem.attributes.component.nodeValue),
        };
    }

    //this will load the url into card media
    loadUrlIntoCardMedia(url, componentObject) {
        const imageView = document.getElementById(componentObject.packageName);
        imageView.src = url;
        imageView.title = "downloaded";
        console.log(document.getElementById(componentObject));
        console.log("load url called");
    }

    //this will process the image download 
    processImageDownload(imageSave, componentObject) {
        const a_href = document.getElementById(componentObject.title + componentObject.packageName);
        a_href.href = "data:application/octet-stream;charset=utf-8;base64," + this.getBase64Image(imageSave);
        console.log("process download is executed");
    }

    /**
     * This will extract the url from string
     * @param {String} myResponse 
     */
    urlExtractor(myResponse, evt) {
        try {
            const matchString = myResponse.match(PATTERN_THIRD);
            const urlMatch = matchString[0].match(PATTERN_THIRD_URL);
            var originalUrl = urlMatch[0];
            var smallUrl;
            if (originalUrl.includes("=")) {
                originalUrl = originalUrl.substring(0, originalUrl.indexOf("=")) + "=s512";
            } else if (originalUrl.includes(" ")) {
                originalUrl = originalUrl.substring(0, originalUrl.indexOf(" ")) + "=s512";
            }
            smallUrl = originalUrl.replace("=s512", "=s128").trim();
            this.loadUrlIntoCardMedia(originalUrl, evt);
            console.log(urlMatch[0]);
            console.log(originalUrl);
        } catch (error) {
            console.log(error);
        }
    }

    /**
        * This makes the http request and parse the url
        * @param {evt} evt 
        */
    processRequest(evt, imageView) {
        if (imageView.target.title === "downloaded") {
            this.processImageDownload(imageView.target, evt);
            console.log("returned because same url");
            return;
        }
        const finalUrl = downLoadLink + evt.packageName;
        const urlExt = this.urlExtractor;
        fetch(finalUrl, this.options)
            .then(function (response) {
                return response.text();
            })
            .then(function (myResponse) {
                if (myResponse != null || myResponse != undefined) {
                    urlExt(myResponse, evt);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
        console.log(finalUrl);
    }

    /**
     * this returns the base 64 image 
     * @param {img} img 
     */
    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

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
                                <SingleAppItem {...this.props} onMediaLoaded={this.processRequest}
                                    value={this.getComponentObject(singleItem)} />
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