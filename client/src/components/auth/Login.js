import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://jlutz-portfolio.herokuapp.com/">
        JTL WebDev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated, user, loading } = authContext;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  if (!loading && user && user.isAdmin) {
    return <Redirect to="/admin" />;
  }

  if (!loading && user && !user.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={onSubmit} className={classes.form} noValidate>
            <TextField
              onChange={onChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={onChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Button
              style={{ margin: "0px" }}
              fullWidth
              color="secondary"
              href="/"
              className={classes.submit}
            >
              Continue as a Guest User
            </Button>
            <Box display="flex">
              <Box m="auto">
                <Link href="/register">
                  Don't have an account yet? Sign Up Here.
                </Link>
              </Box>
            </Box>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
