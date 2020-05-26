import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import MessageContext from "../../context/message/messageContext";

import axios from "axios";
import CustomerTabs from "./CustomerTabs";
import ShopTab from "./ShopTab";

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
      {!user && <ShopTab setAlert={setAlert} />}
    </div>
  );
};

export default Customer;
