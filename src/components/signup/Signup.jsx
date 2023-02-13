import logo from "../../assets/svgs/logo.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, CardActions } from "@mui/material";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const useStyles = createUseStyles({
    text_grey_center: {
      color: "grey",
      textAlign: "center",
    },
    card_login_link: {
      height: "7.5vh",
      marginTop: "2%",
    },
  });

  const classes = useStyles();

  return (
    <div className="signup-container">
      <div className="signup-card">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={logo} alt="logo" />
          </div>
          <CardContent>
            <Typography
              className={classes.text_grey_center}
              gutterBottom
              variant="subtitle1"
            >
              Sign up to see photos and videos from your friends!
            </Typography>
            {true && (
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
            )}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <Button
              color="info"
              fullWidth={true}
              variant="outlined"
              margin="dense"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              UPLOAD PROFILE PICTURE
              <input type="file" name="images/*" hidden />
            </Button>
          </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained">
              SIGN UP
            </Button>
          </CardActions>
          <CardContent>
            <Typography
              className={classes.text_grey_center}
              gutterBottom
              variant="subtitle1"
            >
              By signing up, you agree to our Terms, Data Policy and Cookies
              Policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card_login_link}>
          <CardContent>
            <Typography
              className={classes.text_grey_center}
              gutterBottom
              variant="subtitle1"
            >
              Having an account?
                 <Link to={`/login`} className="login-link">
              Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
