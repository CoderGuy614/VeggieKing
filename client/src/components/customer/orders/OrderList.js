import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

import Typography from "@material-ui/core/Typography";
import ExpPanel from "./ExpPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "90%",
    marginTop: 40,
    padding: "0px",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "10px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.arcOrange,
  },
}));

export default function OrderList({ user }) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersByUser(user._id);
    //eslint-disable-next-line
  }, []);

  const getOrdersByUser = (userId) => {
    axios
      .get(`/api/orders/${userId}`)
      .then((response) => setOrders(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h6">My Orders</Typography>
        <List className={classes.root}>
          {orders.map((order) => {
            return <ExpPanel key={order._id} order={order} />;
          })}
        </List>
      </Paper>
    </Container>
  );
}
