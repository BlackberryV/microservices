"use client";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { getSellers } from "../api/sellers";

export const AllData = () => {
  const [sellersData, setSellersData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    getSellers().then((sellers) => setSellersData(sellers));
    getProducts().then((products) => setProductsData(products));
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 90 }}>
      <table>
        <thead>
          <h1>Sellers</h1>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {sellersData.length ? (
            sellersData.map(({ name, phoneNumber, id }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Pending...</td>
            </tr>
          )}
        </tbody>
      </table>
      <table>
        <thead>
          <h1>Products</h1>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productsData.length ? (
            productsData.map(({ title, id, price }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{price}$</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Pending...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
