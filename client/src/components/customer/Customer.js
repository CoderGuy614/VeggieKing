import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserForm from "../customer/stepForm/UserForm";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import OrderForm from "./orderForm/OrderForm";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import axios from "axios";
import Confirm from "./checkout/Confirm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Customer = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { user, isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [newProfile, setNewProfile] = useState(false);

  const updateTotal = (value) => {
    setTotal(Number(value));
  };

  const updateData = (value) => {
    setData(value);
  };

  const handleContinue = async () => {
    if (isAuthenticated) {
      //check for a profile at user_id
      try {
        const res = await axios.get(`/api/profile/user/${user._id}`);
        if (res.data) {
          setUserProfile(res.data);
        }
      } catch (err) {
        // Profile not found
        console.log(err.response.data.msg);
        setNewProfile(true);
        //
      }
    } else {
      setAlert("Please Login or Register to Proceed", "warning");
    }
  };

  const classes = useStyles();
  return (
    <div className="classes.root">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}> Please Choose Your Items </Paper>
          </Grid>
          <Grid item xs={12}>
            <OrderForm updateTotal={updateTotal} setData={updateData} />
          </Grid>
          <Grid item xs={12}>
            <h4> Your Order Total is: USD $ {`${total / 4000}`} </h4>
            <h4> Your Order Total is: KHR {total} </h4>
          </Grid>
          <Grid item xs={12}>
            {total > 0 && (
              <Button onClick={handleContinue} color="primary" size="large">
                {" "}
                Continue{" "}
              </Button>
            )}
            {isAuthenticated && userProfile && (
              <Confirm
                data={data}
                profile={userProfile}
                newProfile={newProfile}
              />
            )}
            {isAuthenticated && total > 0 && newProfile && (
              <Confirm
                data={data}
                profile={userProfile}
                newProfile={newProfile}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Customer;
