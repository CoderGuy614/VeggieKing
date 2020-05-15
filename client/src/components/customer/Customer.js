import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../layout/Theme";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import OrderForm from "./orderForm/OrderForm";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import axios from "axios";
import Confirm from "./checkout/Confirm";
import Success from "./checkout/Success";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "10px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.arcOrange,
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
  const [checkout, setCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const updateTotal = (value) => {
    setTotal(Number(value));
  };

  const updateData = (value) => {
    setData(value);
  };

  const handleOrderSuccess = () => {
    setAlert("Thank you for your order!", "success");
    setOrderSuccess(true);
  };

  const handleContinue = async () => {
    if (isAuthenticated) {
      //check for a profile at user_id
      try {
        const res = await axios.get(`/api/profile/user/${user._id}`);
        if (res.data) {
          setUserProfile(res.data);
          setCheckout(true);
        }
      } catch (err) {
        console.log(err.response.data.msg);
        setCheckout(true);
      }
    } else {
      setAlert("Please Login or Register to Proceed", "danger");
    }
  };

  const classes = useStyles();
  return (
    <div className="classes.root">
      <ThemeProvider theme={theme}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Paper className={classes.paper}>
                  <Typography variant="h6">
                    {" "}
                    Step 1: Please Select Your Items
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <OrderForm updateTotal={updateTotal} setData={updateData} />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Paper className={classes.paper}>
                  <Typography variant="h6">
                    Your Order Total is: USD $ {`${(total / 4000).toFixed(2)}`}
                  </Typography>
                  <Typography variant="body2">
                    <em>Total in Cambodian Riel: KHR {total} </em>
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {total > 0 && !orderSuccess && !checkout && (
                <Button
                  onClick={handleContinue}
                  color="primary"
                  variant="contained"
                  size="large"
                >
                  {" "}
                  Continue{" "}
                </Button>
              )}
              {isAuthenticated && !orderSuccess && checkout && (
                <Confirm
                  data={data}
                  profile={userProfile}
                  handleOrderSuccess={handleOrderSuccess}
                  setAlert={setAlert}
                />
              )}

              {isAuthenticated && orderSuccess && (
                <Container>
                  <Success />
                </Container>
              )}
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Customer;
