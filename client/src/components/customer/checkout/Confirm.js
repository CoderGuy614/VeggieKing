import React, { useContext, useState } from "react";
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

const Confirm = ({ data, handleOrderSuccess, setAlert }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  const [editProfile, setEditProfile] = useState(false);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const orderData = {};
      orderData.user = user;
      orderData.data = data.filter((obj) => obj.qty > 0);
      const res = await axios.post("/api/orders", orderData, config);
      if (res) {
        handleOrderSuccess(orderData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Container style={{ marginTop: "20px" }}>
            <Typography variant="h5">Your Order Details:</Typography>
            <ConfirmTable data={data} />
          </Container>
        </Grid>
        <Grid item xs={12} md={4}>
          <Container style={{ marginTop: "20px" }}>
            {isAuthenticated && user.profile && !editProfile ? (
              <ShowProfile
                user={user}
                handleSubmitOrder={handleSubmitOrder}
                setEditProfile={setEditProfile}
              />
            ) : (
              <EditProfile user={user} setEditProfile={setEditProfile} />
            )}
          </Container>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Confirm;
