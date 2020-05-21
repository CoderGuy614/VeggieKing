import React, { useState, useEffect, useContext, Fragment } from "react";
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
import MessageContext from "../../context/message/messageContext";

import axios from "axios";
import Confirm from "./checkout/Confirm";
import Success from "./checkout/Success";
import MessagePanel from "../layout/MessagePanel";
import OpenChatButton from "./chat/OpenChatButton";
import Chat from "./chat/Chat";

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
  const messageContext = useContext(MessageContext);

  const { setAlert } = alertContext;
  const { user, isAuthenticated } = authContext;
  const { getMessages, unread, clearNotifications } = messageContext;

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    authContext.loadUser();
    getMessages();
    getAdmins();
    //eslint-disable-next-line
  }, []);

  const toggleOpen = () => {
    clearNotifications();
    setTimeout(() => setChatOpen(!chatOpen), 500);
  };

  const updateTotal = (value) => {
    setTotal(Number(value));
  };

  const updateData = (value) => {
    setData(value);
  };

  const handleOrderSuccess = (orderData) => {
    setOrderSuccess(true);
    sendConfirmation(orderData);
  };

  const sendConfirmation = (orderData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/api/confirmation", orderData, config)
      .then((response) => setAlert(`${response.data}`, "success"))
      .catch((err) => console.log(err));
  };

  const handleContinue = () => {
    if (isAuthenticated) {
      setCheckout(true);
    } else {
      setAlert("Please Login or Register to Proceed", "danger");
    }
  };

  const getAdmins = async () => {
    try {
      const res = await axios.get("/api/users/admins");
      if (res) {
        setAdmins(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const classes = useStyles();
  return (
    <div className="classes.root">
      <ThemeProvider theme={theme}>
        <Container>
          {user && !user.isAdmin && (
            <OpenChatButton
              toggleOpen={toggleOpen}
              buttonText={chatOpen}
              user={user}
              unread={unread}
            />
          )}
          {isAuthenticated && chatOpen && <Chat user={user} admins={admins} />}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MessagePanel message="Step 1: Please Select Your Items" />
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
                  fullWidth
                >
                  {" "}
                  Continue{" "}
                </Button>
              )}
              {isAuthenticated && !orderSuccess && checkout && (
                <Fragment>
                  <MessagePanel message="Step 2: Confirm Your Order Info" />
                  <Confirm
                    data={data}
                    handleOrderSuccess={handleOrderSuccess}
                    setAlert={setAlert}
                  />
                </Fragment>
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
