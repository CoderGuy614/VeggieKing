import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import OrderList from "./OrderList";
import axios from "axios";

export default function Admin(props) {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [entries, setEntries] = useState({
    data: [{ id: "", name: "", price: "", pricePer: "" }],
  });

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getOrders();
    //eslint-disable-next-line
  }, []);

  const [state] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Price (Riel)", field: "price", type: "numeric" },
      { title: "Price Per", field: "pricePer" },
    ],
  });

  useEffect(() => {
    axios
      .get("/api/items")
      .then((response) => {
        let data = [];
        response.data.forEach((el) => {
          data.push({
            id: el._id,
            name: el.name,
            price: el.price,
            pricePer: el.pricePer,
          });
        });
        setEntries({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (user && !user.isAdmin) {
    return (
      <div className="container">
        <h2 className="text-center">
          Please sign in as an admin to view this page
        </h2>
      </div>
    );
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <OrderList orders={orders} />
      </Grid>
      <Grid item xs={6}>
        <MaterialTable
          title="Product Manager"
          columns={state.columns}
          data={entries.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  const payload = {
                    name: newData.name,
                    price: newData.price,
                    pricePer: newData.pricePer,
                  };
                  axios.post("/api/items", payload).then((res) => {
                    console.log(res.data);
                    const newState = {
                      id: res.data._id,
                      name: res.data.name,
                      price: res.data.price,
                      pricePer: res.data.pricePer,
                    };
                    const resData = [...data, newState];
                    setEntries({ ...entries, data: resData });
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  axios
                    .put(`/api/items/${entries.data[index].id}`, newData)
                    .then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  axios
                    .delete(`/api/items/${entries.data[index].id}`)
                    .then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              }),
          }}
        />
      </Grid>
    </Grid>
  );
}
