import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppIcon from './images/android.svg';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const downLoadLink = "http://localhost:8010/proxy/details?id=";

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
    },
    contentContainer: {
        margin: 16,
    }
});


//item layout for list in card
function SingleAppItem(props) {
    const { classes } = props;
    return (
        <ListItem >
            <img crossOrigin="Anonymous" id={props.value.packageName} className={classes.cover} src={AppIcon}
                onLoad={props.onMediaLoaded.bind(this, props.value)} />
            <div className={`${classes.details} ${classes.contentContainer}`}>
                <div className={classes.content}>
                    <Typography variant="title"  style={{ fontWeight: 'bold' }}>{props.value.title}</Typography>
                    <br />
                    <Typography variant="subtitle">{props.value.packageName}</Typography>
                </div>
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
class MainComponent extends React.Component {

    constructor(props) {
        super(props)
        this.setState = { urlUpdated: "" };
        this.processRequest = this.processRequest.bind(this);
        this.urlExtractor = this.urlExtractor.bind(this);
    }

    options = {
        method: 'GET',
        headers: {
            "Allow-Control-Allow-Origin": "*",
            crossorigin: "anonymous",
            origin: "https://play.google.com",
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

    getImageInstance(imageSource) {
        const image = document.createElement("img");
        image.crossOrigin = "Anonymous";
        image.src = imageSource;
        image.style.width = '512px';
        image.style.height = '512px';
        return image;
    }

    //this will load the url into card media
    loadUrlIntoCardMedia(url, componentObject) {
        const imageView = document.getElementById(componentObject.packageName);
        imageView.src = url;
        imageView.title = "downloaded";
    }

    //this will process the image download 
    processImageDownload(imageSave, componentObject) {
        const a_href = document.getElementById(componentObject.title + componentObject.packageName);
        a_href.href = "data:application/octet-stream;charset=utf-8;base64," + this.getBase64Image(imageSave);;
    }

    /**
     * This will extract the url from string
     * @param {String} myResponse 
     */
    urlExtractor(myResponse, evt) {
        try {
            console.log("download started");

            const matchString = myResponse.match(/<img[^>]*?alt=['"]Icon image['"][^>]*>/gi);

            if (matchString) {
                const urlMatch = matchString[0].match(/https?:\/\/\S+/);

                if (urlMatch) {
                    console.log(matchString);
                    var originalUrl = urlMatch[0].replace(/"/g, '');
                    var smallUrl;

                    if (originalUrl.includes("=")) {
                        originalUrl = originalUrl.substring(0, originalUrl.indexOf("="));
                    } else if (originalUrl.includes(" ")) {
                        originalUrl = originalUrl.substring(0, originalUrl.indexOf(" "));
                    }

                    smallUrl = originalUrl + "=w480-h960-rw".trim();
                    this.loadUrlIntoCardMedia(originalUrl, evt);
                    console.log(smallUrl);
                    console.log(originalUrl);
                } else {
                    console.log("URL match not found.");
                }
            } else {
                console.log("Pattern match not found.");
            }
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
                console.log(error);
            })
    }

    /**
     * this returns the base 64 image 
     * @param {img} img 
     */
    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalWidth;
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

export default withStyles(styles, { withTheme: true })(MainComponent);