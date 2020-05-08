import React, { Component, Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserForm from "../customer/stepForm/UserForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import OrderForm from "./orderForm/OrderForm";
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
  const [total, setTotal] = useState(0);

  const updateTotal = (value) => {
    setTotal(Number(value));
  };

  const classes = useStyles();
  return (
    <div className="classes.root">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}> THis is a wide Section</Paper>
        </Grid>
        <Grid item xs={12}>
          <OrderForm updateTotal={updateTotal} />
        </Grid>
        <Grid item xs={12}>
          <h4> Your Order Total is: USD $ {`${total / 4000}`} </h4>
          <h4> Your Order Total is: KHR {total} </h4>
        </Grid>
        <Grid item xs={12}>
          <UserForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Customer;