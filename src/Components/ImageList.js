import React, {memo, useState} from "react";
import useStyles from "../styles/ImageListStyles";
import LazyLoad from 'react-lazy-load';
import {Button, Grid} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import Fab from "@material-ui/core/Fab";
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver';
import ReactLoading from "react-loading";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import matIcon from '../images/mat.svg'
import fileIcon from '../images/file.svg'


const zip = new JSZip();


const toDataURL = (url)=> {
    const corsAnywhere = "https://shrouded-mesa-22875.herokuapp.com/"
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', `${corsAnywhere}${url}`);
        // xhr.setRequestHeader("Origin", 'maximum.blog');

        xhr.responseType = 'blob';
        xhr.send();
    })
}


const formatBytes = (bytes, decimals = 2)=>{
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const ImageCard = ({classes, image, isCustom, handleDownload})=>{
    const [showDownload, setShowDownload] = useState(false);
    return (
        <div className={classes.imageContainer} onMouseLeave={()=>setShowDownload(false)} onMouseEnter={()=>setShowDownload(true)}>
            <LazyLoad>
                <img src={isCustom ? getIcon(image.url) : image.url} alt={image.name} className={classes.img}/>
            </LazyLoad>
            <Typography variant="subtitle2" className={classes.imgName}>{image.name}</Typography>
            <Typography variant="subtitle2" className={classes.imgName}>File Size: {formatBytes(image.size)}</Typography>
            {/*<p className={classes.imgName}>{image.name}</p>*/}
            {showDownload &&
                <div style={{marginTop: "0.5em"}}>
                    <Button color={"primary"} variant={"contained"} size={"small"} onClick={()=>handleDownload(image)}>
                        <GetAppIcon style={{marginRight: "0.5em", width: "0.75em"}}/>
                        Download
                    </Button>
                </div>
            }
        </div>
    )
}

const getIcon = (url)=>{
    if(url.includes('.mat'))
        return matIcon
    else return fileIcon
}

//Asynchronously download a file and add it to the zip file
const downloadFile = (zip_, url, filename) =>{
    return new Promise(function(resolve, reject) {
        // getBinaryContent is an API that retrieves files from URLs asynchronously
        JSZipUtils.getBinaryContent(url, function(err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            console.log(filename, data);
            zip_.file(filename, data, {binary: true});
            resolve(data);
        });
    });
}
// Download multiple files
const downloadFiles =(files, zip_, filenum)=> {
    const opt_zip = zip_ || new JSZip();
    let opt_filenum = filenum || 0;
    console.log(files);
    // return downloadFile(opt_zip, files[opt_filenum]["blobUrl"], files[opt_filenum]["name"]).then(function(data) {
    return downloadFile(opt_zip, files[opt_filenum]["blobUrl"], files[opt_filenum]["name"]).then(function(data) {
        opt_filenum++;
        if (opt_filenum === files.length) {
            return opt_zip;
        }
        return downloadFiles(files, opt_zip, opt_filenum);
    });
}

//Zip the file
const doZipFile = (zip_)=> {
    console.log(zip_);
    return zip_.generateAsync({type: "blob"});
}

//Save the file
const saveZipFile = (content)=> {
    //Use FileSaver.js
    return saveAs(content, "lung_xray_files.zip");
}
const isPicture = (name)=>{
    const match = name.match(/(jpg|jpeg|png)/)
    return !!(match && match.length);
}

const isValid = (val)=> val !== undefined
const ImageList = memo(({imageData, setShowResults, custom, stats, error=false, errorMsg=""}) => {
    const classes = useStyles();
    const [isZipping, setIsZipping] = useState(false);
    const [showStats, setShowStats] = useState(false);

    const handleDownload = async(image_=null)=>{
        setIsZipping(true)
        const files = await [image_[0]].map( async image => {
            return {blobUrl: isPicture(image.url) ? await toDataURL(image.url) : image.url, name: image.name}
        })
        Promise.all(files)
            .then((files_)=>{
                downloadFiles(files_, zip, null)
                    .then(doZipFile)
                    .then(saveZipFile)
                    .then(()=>setIsZipping(false))
            })
    }

    const handleSingleDownload = async (image)=>{
        const imageURL = isPicture(image.url) ? await toDataURL(image.url) : image.url
        const a = document.createElement("a");
        a.href = imageURL;
        a.setAttribute("download", image.name);

        const clickHandler = () => {
            setTimeout(() => {
                URL.revokeObjectURL(imageURL);
                a.removeEventListener('click', clickHandler);
            }, 150);
        };

        a.addEventListener('click', clickHandler, false);
        a.click();
    }


    return (
        <div className={classes.root}>
            {error &&
                <Fab color="primary" aria-label="add" className={classes.fabIcon2} onClick={()=>setShowResults(false)}>
                     <ArrowBackIosIcon/>
                </Fab>
            }
            {!error &&
                <Fab color="primary" size={"small"} variant={'extended'} aria-label="add" className={classes.fabIcon}
                      onClick={() => handleDownload(imageData)} disabled={isZipping}>
                    {isZipping ?
                        <span id={"ballsContainer"} className={classes.buttonSpan}>
                                <ReactLoading type={"balls"}/>
                                Downloading and Zipping Files
                        </span>
                        :
                        <>
                            <GetAppIcon style={{marginRight: "0.5em", width: "0.75em"}}/>
                            Download All
                        </>
                    }

                </Fab>
            }
            <Button color={"primary"} variant={"outlined"} size={"small"} onClick={()=>setShowStats(val => !val)}>{showStats ? "Hide Stats" : "Show Stats"}</Button>
            {!error && showStats &&
                <div className={classes.stats}>
                    { isValid(stats.total_file_size) &&
                        <Typography variant="h6" className={classes.statText} color={"primary"}><span>Total downloadable file size: </span>
                            <span>{formatBytes(stats.total_file_size)}</span></Typography>
                    }
                    { isValid(stats.model) &&
                        <Typography variant="h6" className={classes.statText} color={"primary"}><span>Model used: </span>
                            <span>{stats.model.model_name}</span></Typography>
                    }
                    { isValid(stats.model) &&
                        <Typography variant="h6" className={classes.statText} color={"primary"}><span>Model Accuracy: </span>
                            <span>{stats.model.accuracy}</span></Typography>
                    }
                    { isValid(stats.isExistsTimer) &&
                    <Typography variant="h6" className={classes.statText} color={"primary"}><span>URL Exist Check Time: </span>
                        <span>{stats.isExistsTimer.toFixed(4)}s</span></Typography>
                    }
                    { isValid(stats.full_load_time) &&
                        <Typography variant="h6" className={classes.statText} color={"primary"}><span>Page Load Up Time: </span>
                            <span>{stats.full_load_time.toFixed(4)}s</span></Typography>
                    }
                    {isValid(stats.image_processing_time) &&
                        <Typography variant="h6" className={classes.statText}
                                    color={"primary"}>
                            <span>Images: {stats.no_of_images}</span>
                        <span>  --- Process Time: {stats.image_processing_time.toFixed(4)}s</span></Typography>
                    }
                    {isValid(stats.links_processing_time) &&
                        <Typography variant="h6" className={classes.statText}
                                    color={"primary"}>
                            <span>Links: {stats.no_of_links}</span>
                            <span> --- Process Time: {stats.links_processing_time.toFixed(4)}s</span>
                        </Typography>
                    }
                    {isValid(stats.sources_processing_time) &&
                    <Typography variant="h6" className={classes.statText} color={"primary"}>
                        <span>Sources: {stats.no_of_sources}</span>
                        <span> ---  Process Time: {stats.sources_processing_time.toFixed(4)}s</span></Typography>
                    }
                </div>
            }
            <Grid container spacing={2} alignItems={"center"} className={classes.grid} id={"gridContainer"}>
                {!error && imageData!==null && imageData.map((image, index)=>(
                    <Grid item xs={6} md={4} lg={4} className={classes.gridItem} key={index} >
                        <ImageCard
                            classes={classes}
                            image={image}
                            isCustom={custom}
                            handleDownload={handleSingleDownload}
                        />
                    </Grid>
                ))}
                {error &&
                    <div className={classes.errorContainer}>
                        <Typography variant="h6" color={"primary"} className={classes.title}>:(</Typography>
                        <Typography variant="h6" color={"primary"} className={classes.title2}>{errorMsg}</Typography>
                    </div>
                }
            </Grid>
        </div>
    )
})

export default ImageList
