import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";
import OrderInfoTable from "./OrderInfoTable";
import ShowTotal from "./ShowTotal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ExpPanel({ order }) {
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
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
          >
            {order.user.name}
          </Grid>

          <Grid
            container
            alignItems="flex-end"
            justify="flex-end"
            direction="row"
          >
            <Typography className={classes.heading}>
              <Moment format="LT">{order.date}</Moment>
            </Typography>
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <OrderInfoTable order={order} />
            </Grid>
            <Grid item xs={12}>
              <ShowTotal total={orderTotal} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
