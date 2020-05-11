import React, { useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { loading, isAuthenticated, user, logout } = authContext;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Veggie King Food Delivery
          </Typography>

          {!loading && user && !user.isAdmin && (
            <Fragment>
              <Typography variant="subtitle1">
                Welcome back, {user.name}
              </Typography>
              <Button onClick={logout} color="inherit">
                Logout
              </Button>
            </Fragment>
          )}

          {!loading && !user && (
            <Fragment>
              <Button href="/Login" color="inherit">
                Login
              </Button>
              <Button href="/Register" color="inherit">
                Register
              </Button>
            </Fragment>
          )}

          {!loading && user && user.isAdmin && (
            <Fragment>
              <Typography variant="subtitle1">Welcome, {user.name}</Typography>
              <Button href="/admin" color="inherit">
                {" "}
                Dashboard{" "}
              </Button>
              <Button href="/" color="inherit">
                {" "}
                View Store{" "}
              </Button>
              <Button onClick={logout} color="inherit">
                Logout
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
