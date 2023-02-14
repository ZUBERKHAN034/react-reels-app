import "./login.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import logo from "../../assets/svgs/logo.svg";
import frame from "../../assets/images/frame.png";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import slide4 from "../../assets/images/slide4.jpg";
import slide5 from "../../assets/images/slide5.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Button, CardActions } from "@mui/material";
import { createUseStyles } from "react-jss";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import { Link ,useNavigate} from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  // Context Global Store by context-api
  const store = useContext(AuthContext);
  console.log(store);

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
    text_forgot_password: {
      textAlign: "center",
      cursor: "pointer",
    },
  });
  const classes = useStyles();

  // States management
  const [credentials, setCredentials] = useState({
    password: "",
    email: "",
  });
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
    const {email, password} = credentials;
    await login(email, password);
    setLoading(false);
    navigate('/');
  } catch (error) {
      setError({ message: error.message }); 
      setTimeout(() => setError(null), 4000);
      setLoading(false);
      return;
  }
  };

  const handleForgotPassword = () => navigate('/resetpassword');

  return (
    <div className="login-container">
      <div
        className="frame"
        style={{ backgroundImage: `url(${frame})`, backgroundSize: "cover" }}
      >
        <div className="slider">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={5}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={slide1} />
              </Slide>
              <Slide index={1}>
                <Image src={slide2} />
              </Slide>
              <Slide index={2}>
                <Image src={slide3} />
              </Slide>
              <Slide index={3}>
                <Image src={slide4} />
              </Slide>
              <Slide index={4}>
                <Image src={slide5} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="login-card">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={logo} alt="logo" />
          </div>
          <CardContent>
            {error !== null && (
              <Alert severity="error">
               {error.message}
              </Alert>
            )}
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
            <Typography
              color="primary"
              className={classes.text_forgot_password}
              gutterBottom
              variant="subtitle1"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
              LOGIN
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className={classes.card_login_link}>
          <CardContent>
            <Typography
              className={classes.text_grey_center}
              gutterBottom
              variant="subtitle1"
            >
              Don't have an account?
              <Link to={`/signup`} className="signup-link">
                Sign up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
