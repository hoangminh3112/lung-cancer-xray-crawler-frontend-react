import React, {useState} from "react";
import useStyles from "../../styles/HomePageStyles";
import Header from "../layouts/Header";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from '@material-ui/icons/Language';
import Button from "@material-ui/core/Button";
import ReactLoading from 'react-loading';
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AdbIcon from '@material-ui/icons/Adb';
import ImageList from "../ImageList";
import axios from 'axios';
import Tooltip from "@material-ui/core/Tooltip";
import TestModelDialog from "../TestModelDialog";
import SettingsDialog from "../SettingsDialog";
import SettingsIcon from '@material-ui/icons/Settings';

const sampleData =  [
    {
        "name": "a-man-getting-a-chest-xray-for-lung-cancer.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-a-chest-xray-for-lung-cancer.jpg"
    },
    {
        "name": "man-kisses-female-cancer-survivor-on-head.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/man-kisses-female-cancer-survivor-on-head.jpg"
    },
    {
        "name": "x-ray-image-of-lung-cancer-tumor.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/x-ray-image-of-lung-cancer-tumor.jpg"
    },
    {
        "name": "a-man-getting-his-chest-xrayed-by-a-female-doctor.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-his-chest-xrayed-by-a-female-doctor.jpg"
    },
    {
        "name": "a-man-getting-a-chest-xray-for-lung-cancer.jpg",
        "url": "http://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-a-chest-xray-for-lung-cancer.jpg"
    },
    {
        "name": "a-man-getting-a-chest-xray-for-lung-cancer.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-a-chest-xray-for-lung-cancer.jpg"
    },
    {
        "name": "man-kisses-female-cancer-survivor-on-head.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/man-kisses-female-cancer-survivor-on-head.jpg"
    },
    {
        "name": "x-ray-image-of-lung-cancer-tumor.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/x-ray-image-of-lung-cancer-tumor.jpg"
    },
    {
        "name": "a-man-getting-his-chest-xrayed-by-a-female-doctor.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-his-chest-xrayed-by-a-female-doctor.jpg"
    },
    {
        "name": "a-man-getting-a-chest-xray-for-lung-cancer.jpg",
        "url": "http://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-a-chest-xray-for-lung-cancer.jpg"
    },
    {
        "name": "a-man-getting-a-chest-xray-for-lung-cancer.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-a-chest-xray-for-lung-cancer.jpg"
    },
    {
        "name": "man-kisses-female-cancer-survivor-on-head.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/man-kisses-female-cancer-survivor-on-head.jpg"
    },
    {
        "name": "x-ray-image-of-lung-cancer-tumor.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/x-ray-image-of-lung-cancer-tumor.jpg"
    },
    {
        "name": "a-man-getting-his-chest-xrayed-by-a-female-doctor.jpg",
        "url": "https://cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-his-chest-xrayed-by-a-female-doctor.jpg"
    },
    {
        "name": "a-man-getting-a-chest-xray-for-lung-cancer.jpg",
        "url": "http://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/316/316538/a-man-getting-a-chest-xray-for-lung-cancer.jpg"
    }
]

export const fixUrl = (url) => {
    if(!url.includes("http")) return `https://${url}`
    else return url
}
const HomePage = (props) => {
    const classes = useStyles();
    const [url, setUrl] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [scrapedImages, setScrapedImages] = useState(null);
    const [stats, setStats] = useState(null);
    const [custom, setCustom] = useState(false);

    const [useCustomScrapper, setUseCustomScrapper] = useState(false);
    const [customRegex, setCustomRegex] = useState(null);
    const [settingsModal, setSettingsModal] = useState(false);

    const [predictionModal, setPredictionModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const SCRAPPER_URL = process.env.REACT_APP_SCRAPPER_URL

        const handleCrawl = async()=>{
        if(url.length > 0) {
            setIsLoading(true)
            await axios.post(`${SCRAPPER_URL}/scrape`, {url: fixUrl(url), customRegex, useCustomScrapper})
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        if (res.data.output.length > 0) {
                            setScrapedImages(res.data.output)
                            setStats(res.data.stats)
                            setErrorMessage("")
                            setCustom(res.data.custom)
                            setError(false)
                        }
                    } else {
                        if (res.data.output === "NO_IMAGES_FOUND") {
                            setScrapedImages([])
                            setStats(null)
                            setCustom(false)
                            setError(true)
                            setErrorMessage(`Could not find any xray lung cancer ${res.data.custom ? "files/data" : "images"}!`)
                        } else if (res.data.output === "INVALID_URL") {
                            setStats(null)
                            setCustom(false)
                            setScrapedImages([])
                            setError(true)
                            setErrorMessage("Url is invalid!")
                        }else if (res.data.output === "TIMEOUT") {
                            setStats(null)
                            setCustom(false)
                            setScrapedImages([])
                            setError(true)
                            setErrorMessage(`Url could not load up, timed out after ${res.data.isExistsTimer.toFixed(4)}s!`)
                        }else if (res.data.output === "INVALID_REGEX") {
                            setStats(null)
                            setCustom(false)
                            setScrapedImages([])
                            setError(true)
                            setErrorMessage(`Regex could not be compiled. Change regex or turn off custom scrapping!`)
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                    setScrapedImages([])
                    setStats(null)
                    setError(true)
                    setErrorMessage("Something went wrong!")
                })

            setShowResults(true)
            setIsLoading(false)
        }
    }


    const handleEnterPress =   (e)=>{
        if(e.key === 'Enter'){
            e.preventDefault()
            e.stopPropagation()
            handleCrawl()
        }
    }

    const search =
        <div>
            <div className={classes.background}/>
            <Typography variant="h6" color={"primary"} className={classes.title}>
                Crawl x-ray lung cancer image given any URL
            </Typography>
            <div className={classes.searchContainer}>
                <TextField
                    className={classes.search}
                    value={url}
                    onChange={(e)=>setUrl(e.target.value)}
                    id="filled-helperText"
                    label="Enter any web URL"
                    placeholder={"https://google.com"}
                    variant="filled"
                    onKeyPress={handleEnterPress}
                    disabled={isLoading}
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
                <Button variant="contained" color={"primary"} size={"large"} onClick={handleCrawl} disabled={isLoading}>
                    {isLoading?
                        <span id={"ballsContainer"} className={classes.buttonSpan}>
                            <ReactLoading type={"balls"}/>
                            Crawling
                        </span> :
                        <>
                            <AdbIcon style={{marginRight: "0.5em"}}/>
                            Crawl
                        </>}
                </Button>
            </div>
        </div>

    const results =
        <div className={classes.resultsContainer}>
            <ImageList
                imageData={scrapedImages}
                error={error}
                errorMsg={errorMessage}
                stats={stats}
                custom={custom}
                setShowResults={setShowResults}
            />
        </div>

    return (
        <div className={classes.root}>
            <Header/>
            <Tooltip title="Test ML model" placement="right">
                <Fab color="primary" aria-label="add" className={classes.fabIcon2} onClick={()=>setPredictionModal(true)}>
                    <AdbIcon/>
                </Fab>
            </Tooltip>
            <Tooltip title="Customize" placement="right">
                <Fab color="primary" aria-label="add" className={classes.fabIcon3} onClick={()=>setSettingsModal(true)}>
                    <SettingsIcon/>
                </Fab>
            </Tooltip>
            {!error && scrapedImages !== null &&
                <Tooltip title={showResults ? "Go Back" : "See Results"} placement="right">
                    <Fab color="primary" aria-label="add" className={classes.fabIcon} onClick={()=>setShowResults(val => !val)}>
                            {showResults ? <ArrowBackIosIcon/> : <ArrowForwardIosIcon />}
                    </Fab>
                </Tooltip>
            }
            {showResults ? results : search}
            <TestModelDialog
                open={predictionModal}
                handleClose={()=>setPredictionModal(false)}
            />
            <SettingsDialog
                open={settingsModal}
                handleClose={()=>setSettingsModal(false)}
                customRegex={customRegex}
                setCustomRegex={setCustomRegex}
                useCustomScrapper={useCustomScrapper}
                setUseCustomScrapper={setUseCustomScrapper}
            />
        </div>
    )
}

export default HomePage
