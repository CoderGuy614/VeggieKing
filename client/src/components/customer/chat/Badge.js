import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SimpleBadge({ count }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={count} color="secondary">
        <MailIcon />
      </Badge>
    </div>
  );
}
