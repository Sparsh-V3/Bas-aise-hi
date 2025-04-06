import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart-component.css";

function Cart() {
  const [newData, setNewData] = useState([]);

  async function fetchData() {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response);
    const data =
      response.status === 200 ? response.data : "Response status is not OK";
    if (typeof data !== String) {
      setNewData((prevData) => [...prevData, ...data]);
    } else {
      throw new Error(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Cart Component</h1>
      <div className="cart-component">
        {newData.map((item) => {
          const { id, title, price, image } = item;
          return (
            <div className="card" key={id}>
              <p>{id}</p>
              <div className="product-image">
                <img src={image} alt="" />
              </div>
              <p><strong>Product: </strong>{title}</p>
              <p><strong>Price: </strong>{`$${price}`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Cart;
