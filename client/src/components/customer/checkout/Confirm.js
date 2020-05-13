import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../../layout/Theme";
import AuthContext from "../../../context/auth/authContext";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ConfirmTable from "./ConfirmTable";
import Grid from "@material-ui/core/Grid";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";

export class Confirm extends Component {
  state = {
    phone: "",
    location: "",
    deliveryNotes: "",
    profile: this.props.profile,
    data: this.props.data,
    editProfile: false,
    handleOrderSuccess: this.props.handleOrderSuccess,
    setAlert: this.props.setAlert,
  };
  static contextType = AuthContext;

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { location, deliveryNotes, phone } = this.state;
      const res = await axios.post(
        "/api/profile",
        { location, deliveryNotes, phone },
        config
      );
      if (res) {
        this.setState({ profile: res.data, editProfile: false });
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          this.state.setAlert(`${error.msg}`, "danger")
        );
      }
    }
  };

  handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { user } = this.context;
      const { data } = this.state;
      const orderData = {};

      orderData.user = user;
      orderData.data = data.filter((obj) => obj.qty > 0);
      const res = await axios.post("/api/orders", orderData, config);
      if (res) {
        this.state.handleOrderSuccess();
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          this.state.setAlert(`${error.msg}`, "danger")
        );
      }
    }
  };

  handleEditProfile = (e) => {
    e.preventDefault();
    this.setState({ editProfile: true });
  };
  handleCancelEditProfile = (e) => {
    e.preventDefault();
    this.setState({ editProfile: false });
  };

  render() {
    const { isAuthenticated } = this.context;
    const { phone, location, deliveryNotes, data, profile } = this.state;
    const values = { phone, location, deliveryNotes };
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Your Order Details:</Typography>
            <ConfirmTable data={data} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Container>
              {isAuthenticated && profile && !this.state.editProfile ? (
                <ShowProfile
                  handleSubmitOrder={this.handleSubmitOrder}
                  handleEditProfile={this.handleEditProfile}
                  finalData={this.state}
                />
              ) : (
                <EditProfile
                  values={values}
                  handleChange={this.handleChange}
                  handleSubmitProfile={this.handleSubmitProfile}
                  handleCancelEditProfile={this.handleCancelEditProfile}
                />
              )}
            </Container>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
