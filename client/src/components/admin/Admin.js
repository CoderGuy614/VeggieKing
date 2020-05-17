import React, { Fragment, useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";
import Tabs from "./Tabs";

export default function Admin(props) {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      if (res) {
        setOrders(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/profile");
      if (res) {
        setUsers(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    authContext.loadUser();
    getOrders();
    getUsers();

    //eslint-disable-next-line
  }, []);

  if (user && !user.isAdmin) {
    return (
      <div className="container">
        <h2 className="text-center">
          Please sign in as an admin to view this page
        </h2>
      </div>
    );
  }

  return <Tabs orders={orders} users={users} />;
}
