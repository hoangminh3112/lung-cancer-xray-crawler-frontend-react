import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import error404 from "../../images/error404.png";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        background: `url(${error404}) center no-repeat #fff`,
        position: "fixed",
        left: "0px",
        top: "0px",
        zIndex: 999

    },
}));


const Error404Page = () => {
    const classes = useStyles();
    return (
        <div style={{width: "100%", height: "100%"}}>
            <div className={classes.root}/>
        </div>
    )
};

export default Error404Page
