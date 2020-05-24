import React, { useState, useEffect, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../layout/Theme";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import MessageContext from "../../context/message/messageContext";

import axios from "axios";
import CustomerTabs from "./CustomerTabs";
import Guest from "./Guest";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
  const { getMessages } = messageContext;

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    authContext.loadUser();
    getMessages();
    getAdmins();
    //eslint-disable-next-line
  }, []);

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
      {user && !user.isAdmin && (
        <CustomerTabs
          user={user}
          isAuthenticated={isAuthenticated}
          admins={admins}
          setAlert={setAlert}
        />
      )}
      {!user && <Guest />}
    </div>
  );
};

export default Customer;
