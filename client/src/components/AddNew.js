import React, { useState, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";

const AddNew = () => {
  const initialValues = {
    name: "",
    price: "",
    pricePer: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const addItem = (e) => {
    axios
      .post("/api/items", formData)
      .then((res) => setFormData({ name: "", price: "", pricePer: "" }));
  };

  return (
    <MuiThemeProvider>
      <Fragment>
        <AppBar title="Add a New Item" />
        <TextField
          onChange={handleChange("name")}
          hintText="Item Name"
          floatingLabelText="Item Name"
          defaultValue={formData.name}
        />
        <br />
        <TextField
          onChange={handleChange("price")}
          hintText="Price"
          floatingLabelText="Price"
          defaultValue={formData.price}
        />
        <br />
        <TextField
          onChange={handleChange("pricePer")}
          hintText="Price Per"
          floatingLabelText="Price Per"
          defaultValue={formData.pricePer}
        />
        <br />
        <RaisedButton
          onClick={addItem}
          label="Add Item"
          primary={true}
          style={styles.button}
        />
      </Fragment>
    </MuiThemeProvider>
  );
};

const styles = {
  button: {
    margin: 15,
  },
};

export default AddNew;
