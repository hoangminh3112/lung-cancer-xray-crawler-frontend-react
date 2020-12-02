import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import Switch from "@material-ui/core/Switch";
import {Typography} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {


    },
    errorContainer:{
        display: "flex",
        width: "100%",
        height: "20em",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    resultContainer:{
        display: "flex",
        width: "100%",
        height: "7.5em",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    title:{
        fontSize: "1.25rem !important",
        textAlign: "center !important",
        fontWeight: "bold !important"
    },
    title2:{
        fontSize: "1.25rem !important",
        marginTop: "0.5em !important",
        textAlign: "center !important",
        fontWeight: "bold !important"
    },
    switchContainer:{
        display: "flex",
        alignItems: "center",
        marginBottom: "1em"
    },
    "@global #classifyImage":{
        color: `${theme.palette.primary.main} !important`,
        fontWeight: "bold !important"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SettingsDialog = ({open, handleClose, customRegex, setCustomRegex, useCustomScrapper, setUseCustomScrapper}) => {
    const classes = useStyles();
    const [customRegex_, setCustomRegex_] = useState(customRegex);
    const [useCustomScrapper_, setUseCustomScrapper_] = useState(useCustomScrapper);

    const handleEnterPress =   (e)=>{
        if(e.key === 'Enter'){
            e.preventDefault()
            e.stopPropagation()
            handleUpdate()
        }
    }
    const handleUpdate = ()=>{
        setCustomRegex(customRegex_)
        setUseCustomScrapper(useCustomScrapper_)
        handleClose()
    }
    const handleSwitch = (e)=> setUseCustomScrapper_(e.target.checked)


    const onEnter = ()=>{
        setCustomRegex_(customRegex)
        setUseCustomScrapper_(useCustomScrapper)
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted={false}
            onClose={handleClose}
            onEnter={onEnter}
            fullWidth={true}
            maxWidth={'sm'}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="classifyImage" >{"Settings"}</DialogTitle>
            <DialogContent>
                <div className={classes.switchContainer}>
                    <Typography>Use custom scrapper(scrape for files)</Typography>
                    <Switch
                        checked={useCustomScrapper_}
                        onChange={handleSwitch}
                        color="primary"
                    />
                </div>

                <TextField
                    label="Enter regex to scrape files"
                    placeholder={"(.zip|.rar|.mat)"}
                    value={customRegex_}
                    onChange={(e) => setCustomRegex_(e.target.value)}
                    onKeyPress={handleEnterPress}
                    fullWidth
                    disabled={!useCustomScrapper_}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <IconButton
                                    className={classes.webIcon}
                                    aria-label="web icon"
                                    edge="end"
                                >
                                    <FindReplaceIcon/>
                                </IconButton>
                            </InputAdornment>,
                    }}
                />

            </DialogContent>


            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary" variant={"contained"} >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SettingsDialog
