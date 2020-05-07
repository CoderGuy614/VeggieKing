import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Spinner from "./Spinner";

import ProductTable from "./ProductTable";

const Products = (props) => {
  const [items, setItems] = useState(null);

  useEffect(async () => {
    const res = await axios.get("/api/items");
    setItems(res.data);
  }, []);

  return (
    <Fragment>
      {items === null ? <Spinner /> : <ProductTable items={items} />}
    </Fragment>
  );
};

export default Products;
