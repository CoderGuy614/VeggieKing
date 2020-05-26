import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        JTL WebDev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const classes = useStyles();

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, user, loading } = authContext;

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = credentials;

  const onChange = (e) =>
    setcredentials({ ...credentials, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return setAlert("Passwords do not match", "danger");
    }
    register({
      name,
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginBottom: "0px" }}
            className={classes.submit}
          >
            Sign Up
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
              <Link href="/login">Already have an account? Sign in</Link>
            </Box>
          </Box>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
