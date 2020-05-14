import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup({ handleStatusChange, status }) {
  const [value, setValue] = React.useState(status);

  const handleChange = (event) => {
    setValue(event.target.value);
    handleStatusChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Order Status</FormLabel>
      <RadioGroup
        aria-label="Order Status"
        name="status"
        row
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="new" control={<Radio />} label="New" />
        <FormControlLabel
          value="inProcess"
          control={<Radio />}
          label="In Process"
        />
        <FormControlLabel value="closed" control={<Radio />} label="Closed" />
      </RadioGroup>
    </FormControl>
  );
}
