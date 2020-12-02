import { makeStyles} from "@material-ui/core/styles";
import background from "../images/Flat-Mountains.svg"

const useStyles = makeStyles((theme) => ({
    root: {

    },
    background:{
        opacity: "0.5",
        zIndex: "-1",
        backgroundImage: `url(${background})`,
        position: "absolute",
        width: "100%",
        height: "83.5%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    title:{
        fontSize: "2rem !important",
        marginTop: "2em !important",
        textAlign: "center !important",
        fontWeight: "bold !important"
    },
    searchContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "15em"
    },
    search:{
        width: "35em",
        height: "6em"
    },
    webIcon:{
        marginRight: "0.5em"
    },
    fabIcon3:{
        bottom: "105px",
        left: "30px",
        position: "absolute !important",
    },
    fabIcon2:{
        bottom: "30px",
        left: "30px",
        position: "absolute !important",
    },
    fabIcon:{
        bottom: "175px",
        left: "30px",
        position: "absolute !important",
    },
    buttonSpan:{
        display: "flex"
    },
    resultsContainer:{
      padding: "2em",
        paddingTop: "1em"
    },
    "@global .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-formControl.MuiInputBase-adornedStart.MuiFilledInput-adornedStart":{
        height: "5em !important"
    },
    "@global #ballsContainer div":{
        width: "1.5em !important",
        height: "1.5em !important",
        fill: `${theme.palette.primary.main} !important`,
        opacity: "0.5",
        display: "inline-block !important",
        marginRight: "0.5em"
    },
    "@global .fileContainer":{
        boxShadow: "none !important"
    }

}));

export default useStyles
