import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const QtyInput = (props) => {
  const { data } = props;

  const classes = useStyles();

  return (
    <FormControl
      className={clsx(classes.margin, classes.withoutLabel, classes.textField)}
    >
      <Input
        value={data.rowData.qty}
        type="number"
        onChange={(e) => data.onChange(e.target.value)}
        id="standard-adornment-weight"
        endAdornment={
          <InputAdornment position="end">
            {data.rowData.pricePer}
          </InputAdornment>
        }
        aria-describedby="standard-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
      />
    </FormControl>
  );
};

export default QtyInput;
