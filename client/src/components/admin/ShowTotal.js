import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

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

export default function ShowTotal({ total }) {
  const classes = useStyles();
  return (
    <Box>
      <Paper className={classes.paper}>
        <Typography variant="h6">
          Your Order Total is: USD $ {`${(total / 4000).toFixed(2)}`}
        </Typography>
        <Typography variant="p">
          <em>Total in Cambodian Riel: KHR {total} </em>
        </Typography>
      </Paper>
    </Box>
  );
}
