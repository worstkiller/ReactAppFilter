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
    return (
        <Card className={classes.card}>
            <ListItem>
                <CardMedia
                    className={classes.cover}
                    image={AppIcon}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="headline">WhatsApp</Typography>
                        <Typography variant="subheading" color="textSecondary">
                            com.android.facebook
                        </Typography>
                    </CardContent>
                </div>
                <CardActions className={classes.actions}>
                    <Button size="small" color="primary">
                        Download
                    </Button>
                </CardActions>
            </ListItem>
        </Card>

    )
}

class Home extends React.Component {
    render() {
        var array = this.props.appFilter.appFilter;
        // return (
        //     <div>
        //         <List>
        //             for (let index = 0; index < array.length; index++) {
        //          const element = array[index];
        //          <SingleAppItem {...this.props} />
        //             }
        //         </List>
        //     </div>
        // );
        if (array.getElementsByTagName("item") != null) {
            const itemArray = array.getElementsByTagName("item");
            console.log(array.getElementsByTagName("item"));    
            for (var i = 0, max = itemArray.length; i < max; i++) {
                console.log(itemArray[i].getAttribute("component"));
                return(
                      <h2>{itemArray[i].getAttribute("component")}</h2>  
                );
            }

        } else {
            return <h3>No Items found</h3>
        }
    }
}

export default withStyles(styles, { withTheme: true })(Home);