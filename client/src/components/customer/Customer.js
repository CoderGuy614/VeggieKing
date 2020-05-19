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

  const { setAlert } = alertContext;
  const { user, isAuthenticated } = authContext;

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    authContext.loadUser();
    getAdmins();
    //eslint-disable-next-line
  }, [newMessage]);

  const toggleOpen = () => {
    setChatOpen(!chatOpen);
    updateMessagesRead(user, messages);
    setClear(true);
  };

  const updateTotal = (value) => {
    setTotal(Number(value));
  };

  const updateData = (value) => {
    setData(value);
  };

  const handleNewMessage = () => {
    setNewMessage(!newMessage);
  };

  const handleOrderSuccess = () => {
    setAlert("Your order was placed successfully!", "success");
    setOrderSuccess(true);
  };

  const sendConfirmation = async (orderData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/confirmation", orderData, config);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          this.state.setAlert(`${error.msg}`, "danger")
        );
      }
    }
  };

  const updateMessagesRead = async (user, messages) => {
    let messagesRead;
    if (user && messages) {
      messagesRead = messages.filter((msg) => msg.to === user._id).length;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        `/api/users/${user._id}`,
        { messagesRead },
        config
      );
      console.log(res);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          this.state.setAlert(`${error.msg}`, "danger")
        );
      }
    }
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

  // const getMessages = async () => {
  //   try {
  //     const res = await axios.get("/api/messages");
  //     if (res) {
  //       setMessages(res.data);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

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
              messages={messages}
              clear={clear}
            />
          )}
          {isAuthenticated && chatOpen && (
            <Chat
              user={user}
              messages={messages}
              admins={admins}
              handleNewMessage={handleNewMessage}
            />
          )}

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
                    profile={userProfile}
                    handleOrderSuccess={handleOrderSuccess}
                    sendConfirmation={sendConfirmation}
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
