import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
const ProductTable = () => {
  const [entries, setEntries] = useState({
    data: [{ id: "", name: "", price: "", pricePer: "" }],
  });

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
  const options = {
    tableLayout: "auto",
    pageSize: 10,
    actionsCellStyle: {
      color: "#0B72B9",
    },
  };
  return (
    <MaterialTable
      options={options}
      style={{ margin: "10px" }}
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
  );
};

export default ProductTable;
