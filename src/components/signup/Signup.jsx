import "./signup.css";
import logo from "../../assets/svgs/logo.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, CardActions } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage, database } from "../../services/firebase";

export default function Signup() {
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
  const [credentials, setCredentials] = useState({
    password: "",
    email: "",
    name: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  // Methods
  const handleCredentials = (e) => {
    const { name, value } = e.target;
    const handleChange = { ...credentials, [name]: value };
    setCredentials(handleChange);
  };

  const handleFile = (e) => {
    const { files } = e.target;
    const file = files[0];
    setFile(file);
  };

  const handleClick = async () => {
    if (file === null) {
      const error = { message: "Please Upload Profile Picture!" };
      setError(error);
      setTimeout(() => setError(null), 2000);
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const { email, password, name } = credentials;
      const createdUser = await signup(email, password);
      const uid = createdUser.user.uid;
      const location = `/users/${uid}/profile-image`;
      const uploadTask = storage.ref(location).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          setError(error.message);
          setError(error);
          setTimeout(() => setError(null), 4000);
          return;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            const params = {
              email: email,
              userId: uid,
              fullName: name,
              profileUrl: url,
              createdAt: database.getTimeStamp(),
            };
            database.users.doc(uid).set(params);
          });
          setLoading(false);
          navigate("/");
        }
      );
    } catch (error) {
      setError({ message: error.message });
      setTimeout(() => setError(null), 4000);
      setLoading(false);
      return;
    }
  };
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
            <TextField
              id="outlined-basic"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={credentials.password}
              onChange={handleCredentials}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={credentials.name}
              onChange={handleCredentials}
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
              <input type="file" name="images/*" hidden onChange={handleFile} />
            </Button>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              disabled={loading}
              onClick={handleClick}
            >
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
