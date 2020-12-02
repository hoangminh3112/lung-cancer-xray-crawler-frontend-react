import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/Language";
import DialogContentText from "@material-ui/core/DialogContentText";
import ImageUploader from 'react-images-upload';
import Typography from "@material-ui/core/Typography";
import {fixUrl} from "./pages/HomePage";

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
    "@global #classifyImage":{
        color: `${theme.palette.primary.main} !important`,
        fontWeight: "bold !important"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TestModelDialog = ({open, handleClose}) => {
    const classes = useStyles();
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [modelPrediction, setModelPrediction] = useState(null);
    const [showFileUpload, setShowFileUpload] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const SCRAPPER_URL = process.env.REACT_APP_SCRAPPER_URL

    const handleModelPrediction = async()=>{
        if(url.length > 0 || imageUrl.length >0) {
            setIsLoading(true)
            const data= {url: showFileUpload ? imageUrl : fixUrl(url)}
            await axios.post(`${SCRAPPER_URL}/xray_image_classification_model`, data)
                .then(res => {
                    // console.log(res);
                    if (res.data.success) {
                        setModelPrediction(res.data.prediction)
                        setError(false)
                    } else {
                        setModelPrediction(null)
                        setError(true)
                    }
                })
                .catch(e => {
                    console.log(e);
                    setModelPrediction(null)
                    setError(true)
                })
            setIsLoading(false)
        }
    }


    const handleEnterPress =   (e)=>{
        if(e.key === 'Enter'){
            e.preventDefault()
            e.stopPropagation()
            handleModelPrediction()
        }
    }

    const onDrop = (pictures, imgurls)=>{
        if(imgurls.length !== 0)
            setImageUrl(imgurls[0].replace(/(?<=name=)(.*)(?=;)/g, '').replace('name=;', ''))
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted={false}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'sm'}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="classifyImage" >{"Classify Image"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{marginBottom: "1.5em"}}>
                    <Button color={"primary"} variant={"outlined"} size={"small"} onClick={()=>{
                        setShowFileUpload(val => !val)
                        setError(false)
                    }} >
                        {showFileUpload ? "Enter Image url" : "Upload Image"}
                    </Button>
                </DialogContentText>

                {!error && !showFileUpload &&
                <TextField
                    label="Enter Image URL"
                    placeholder={"https://cdn.pixabay.com/photo/2016/06/24/03/53/diagnosis-1476620_1280.jpg"}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleEnterPress}
                    disabled={isLoading}
                    fullWidth
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <IconButton
                                    className={classes.webIcon}
                                    aria-label="web icon"
                                    edge="end"
                                >
                                    <LanguageIcon/>
                                </IconButton>
                            </InputAdornment>,
                    }}
                />
                }
                {!error && showFileUpload &&
                        <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            buttonText={'Upload Image'}
                            onChange={onDrop}
                            imgExtension={['.jpg', '.png', '.jpeg']}
                            maxFileSize={52428800}
                            singleImage
                        />
                }
                {error &&
                    <div className={classes.errorContainer}>
                        <Typography variant="h6" color={"primary"} className={classes.title}>:(</Typography>
                        <Typography variant="h6" color={"primary"} className={classes.title2}>{"Something Went Wrong"}</Typography>
                    </div>
                }
                {modelPrediction !== null &&
                    <div className={classes.resultContainer}>
                        <Typography variant="h6" color={"primary"} className={classes.title}>{modelPrediction.prediction ? "Image is an Xray" : "Image is not an xray"}</Typography>
                        <Typography variant="h6" color={"primary"} className={classes.title2}>Confidence: {parseFloat(modelPrediction.probability).toFixed(4)}</Typography>
                    </div>
                }
            </DialogContent>


            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>handleModelPrediction()} color="primary" variant={"contained"} disabled={isLoading}>
                    Classify
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TestModelDialog
