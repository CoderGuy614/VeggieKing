import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import OrderSummaryContents from "./OrderSummaryContents";
import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OrderInfoTable from "./OrderInfoTable";
import ShowTotal from "./ShowTotal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "12px 12px",
    background: "#0B72B9",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    maxWidth: "100%",
  },
}));

export default function ExpPanel({ order }) {
  const translator = {
    new: "green",
    inProcess: "orange",
    closed: "red",
  };

  const orderTotal = order.data.reduce((a, b) => a + b.total, 0);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <OrderSummaryContents order={order} orderTotal={orderTotal} />
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <OrderInfoTable order={order} />
              </Grid>
              <Grid item xs={12}>
                <ShowTotal total={orderTotal} />
              </Grid>
            </Grid>
          </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
