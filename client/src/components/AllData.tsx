"use client";
import { FormEvent, useEffect, useState } from "react";
import { createProduct, deleteProduct, editProduct, getProducts } from "../api/products";
import {
  createSeller,
  deleteSeller,
  editSeller,
  getSellers,
} from "../api/sellers";

export const AllData = () => {
  const [sellersData, setSellersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    getSellers().then((sellers) => setSellersData(sellers));
    getProducts().then((products) => setProductsData(products));
  }, []);

  const addSellerHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createSeller(name, phoneNumber);
    getSellers().then((sellers) => setSellersData(sellers));
    setName("");
    setPhoneNumber("");
  };

  const deleteSellerHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await deleteSeller(id);
    getSellers().then((sellers) => setSellersData(sellers));
    setName("");
    setPhoneNumber("");
    setId("");
  };

  const editSellerHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await editSeller(id, name, phoneNumber);
    getSellers().then((sellers) => setSellersData(sellers));
    setName("");
    setPhoneNumber("");
    setId("");
  };

  const editProductHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await editProduct(productId, productName, productPrice);
    getProducts().then((products) => setProductsData(products));
    setProductName("");
    setProductPrice("");
    setProductId("");
  };


  const addProductHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createProduct(productName, productPrice);
    getProducts().then((products) => setProductsData(products));
    setProductName("");
    setProductPrice("");
  };

  const deleteProductHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await deleteProduct(productId);
    getProducts().then((products) => setProductsData(products));
    setProductName("");
    setProductPrice("");
    setProductId("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', width: '70vw', margin: '20px auto' }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 90 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <table>
            <thead>
              <h3>Sellers</h3>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {sellersData?.map((item: any, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form
          onSubmit={addSellerHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <b>create seller</b>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <form
          onSubmit={deleteSellerHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <b>delete seller</b>
          <label>
            Id:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <button type="submit">Delete</button>
        </form>
        <form
          onSubmit={editSellerHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <b>edit seller</b>
          <label>
            Id:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button type="submit">Edit</button>
        </form>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 90 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <table>
            <thead>
              <h3>Products</h3>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {productsData?.map((item: any, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form
          onSubmit={addProductHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <b>create seller</b>
          <label>
            Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <form
          onSubmit={deleteProductHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <b>delete seller</b>
          <label>
            Id:
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </label>
          <button type="submit">Delete</button>
        </form>
        <form
          onSubmit={editProductHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <b>edit seller</b>
          <label>
            Id:
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </label>
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
};
