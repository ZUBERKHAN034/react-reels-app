import "./resetpassword.css";
import logo from "../../assets/svgs/logo.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Button, CardActions } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  // Material UI components styling
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

  // States management
  const [credentials, setCredentials] = useState({ email: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useContext(AuthContext);

  // Methods
  const handleCredentials = (e) => {
    const { name, value } = e.target;
    const handleChange = { ...credentials, [name]: value };
    setCredentials(handleChange);
  };

  const handleClick = async () => {
    try {
      setError(null);
      setLoading(true);
      const { email } = credentials;
      await resetPassword(email);
      const success = { message: "Reset Password link send successfully!" };
      setSuccess(success);
      setTimeout(() => setSuccess(null), 6000);
      setLoading(false);
      return;
    } catch (error) {
      setError({ message: error.message });
      setTimeout(() => setError(null), 4000);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="resetpassword-container">
      <div className="resetpassword-card">
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
              Enter your email, we'll send you a link to get back into your
              account.
            </Typography>
            {error !== null && <Alert severity="error">{error.message}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={credentials.email}
              onChange={handleCredentials}
            />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              disabled={loading}
              onClick={handleClick}
            >
              SEND LINK
            </Button>
          </CardActions>
          <CardContent>
            {success && <Alert severity="success">{success.message}</Alert>}
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card_login_link}>
          <CardContent>
            <Typography
              className={classes.text_grey_center}
              gutterBottom
              variant="subtitle1"
            >
              Back to
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
