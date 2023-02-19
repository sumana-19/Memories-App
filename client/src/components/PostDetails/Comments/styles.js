import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentIcon: {
    padding: "10px",
  },
  paper: theme.spacing(2),
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    padding: "5px",
    marginLeft: "25px",
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
