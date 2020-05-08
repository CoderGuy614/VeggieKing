import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";

import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Button from "@material-ui/core/Button";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class OrderForm extends Component {
  constructor(props) {
    super(props);
    // const { updateTotal } = this.props.updateTotal;
    this.state = {
      columns: [
        { title: "Name", field: "name", editable: "never" },
        {
          title: "Price (Riel)",
          field: "price",
          type: "currency",
          currencySetting: { currencyCode: "KHR", minimumFractionDigits: 0 },
          editable: "never",
        },
        {
          title: "Price Per",
          field: "pricePer",
          type: "numeric",
          editable: "never",
        },
        {
          title: "Qty",
          field: "qty",
          type: "numeric",
          editable: "onUpdate",
          // editComponent: (data) => <Button>Click Me</Button>,
        },
        {
          title: "Total",
          field: "total",
          type: "currency",
          currencySetting: { currencyCode: "KHR", minimumFractionDigits: 0 },
          editable: "never",
        },
      ],
      data: [],
      validationError: "Please enter a postive Number Only",
    };
  }
  componentDidMount() {
    axios.get("/api/items").then((response) => {
      let dat = response.data;
      dat.forEach((el) => (el.qty = 0));
      dat.forEach((el) => (el.total = 0));
      this.setState({ data: dat });
    });
  }
  render() {
    return (
      <MaterialTable
        onSelectionChange={() => console.log("SLEECTION CHANGE")}
        icons={tableIcons}
        title="Order Form"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);

                  data[index].qty = Number(newData.qty);
                  if (data[index].qty < 0) {
                    reject();
                  }
                  data[index].total = newData.qty * newData.price;
                  let grandTotal = 0;
                  data.forEach((el) => (grandTotal += el.total));
                  this.props.updateTotal(grandTotal);

                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
        }}
      />
    );
  }
}

export default OrderForm;
