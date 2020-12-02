import { makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        // width: "100%",
        // height: "100%",
        // padding: "2em"
    },
    img:{
        width: "7em"
    },
    imageContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "15em"
    },
    imgName:{
        fontSize: "0.85rem",
        maxWidth: "15em"
    },
    grid: {
        maxHeight: "34em",
        overflowY: "auto"
    },
    fabIcon:{
        bottom: "30px",
        right: "30px",
        position: "absolute !important",
        fontSize: "0.75rem",
        padding: "1.75em !important"
    },
    buttonSpan:{
        display: "flex"
    },
    errorContainer:{
        display: "flex",
        width: "100%",
        height: "20em",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    title:{
        fontSize: "1.5rem !important",
        textAlign: "center !important",
        fontWeight: "bold !important"
    },
    title2:{
        fontSize: "1.5rem !important",
        marginTop: "2em !important",
        textAlign: "center !important",
        fontWeight: "bold !important"
    },
    fabIcon2:{
        bottom: "30px",
        left: "30px",
        position: "absolute !important",
    },
    statText:{
        fontSize: "0.85rem !important",
        fontWeight: "bold"
    },
    stats:{
        marginBottom: "1em"
    }

}));

export default useStyles
