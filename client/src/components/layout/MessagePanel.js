import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

const MessagePanel = ({ message }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Box>
        <Paper className={classes.paper}>
          <Typography variant="h6"> {message}</Typography>
        </Paper>
      </Box>
    </Grid>
  );
};

export default MessagePanel;
