import React from "react";
import useStyles from "../../styles/HeaderStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AdbIcon from '@material-ui/icons/Adb';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";



const Header = ()=> {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={"/"} className={classes.removeDefaultLink}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <AdbIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={"/"} className={classes.removeDefaultLink}>
                            Web Crawler
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header
