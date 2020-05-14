import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import Grid from "@material-ui/core/Grid";
import OrderList from "./OrderList";
import axios from "axios";
import ProductTable from "./ProductTable";

export default function Admin(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { user } = authContext;

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      const errors = err.response.data.errors;
      errors.forEach((error) => {
        setAlert(`${error.msg}`, "danger");
      });
    }
  };

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getOrders();
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

  return (
    <Grid container spacing={1}>
      <Grid item sm={12} md={6}>
        <OrderList orders={orders} />
      </Grid>
      <Grid item sm={12} md={6}>
        <ProductTable />
      </Grid>
    </Grid>
  );
}
