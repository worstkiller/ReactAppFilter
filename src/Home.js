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
        paddingLeft: 16,
        paddingTop: 16,
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
        <div>
            {props.iconsArray.map(function (listValue,count) {
                console.log(listValue);
                return <div>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cover}
                            image={AppIcon}
                        />
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography variant="headline">{listValue.name}</Typography>
                                <Typography variant="subheading" color="textSecondary">
                                    {listValue.package}
                        </Typography>
                            </CardContent>
                        </div>
                        <CardActions className={classes.actions}>
                            <Button size="small" color="primary">
                                Download
                    </Button>
                        </CardActions>
                    </Card>
                </div>
            })}
        </div>
    )
}

class Home extends React.Component {
    render() {
        console.log(this.props);
        return (
            <SingleAppItem {...this.props}/>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Home);