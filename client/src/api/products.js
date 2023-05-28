import axios from "axios";
import { productsApiUrl } from "../constants";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${productsApiUrl}`);
    const products = res.data;
    return products;
  } catch (e) {
    console.log(e);
  }
};

export const createProduct = async (name, price) => {
  try {
    const res = await axios.post(`${productsApiUrl}`, {
      name: name,
      price: price,
    });
    const product = res.data;
    return product;
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = (id) => {
  return axios
    .delete(`${productsApiUrl}${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      throw error.response?.data ?? { error: "Failed to delete product" };
    });
};

export const editProduct = (id, name, price, count) => {
  return axios
    .put(`${productsApiUrl}${id}`, {
      name: name,
      price: price,
      count: Number(count),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      throw error.response?.data ?? { error: "Failed to update product" };
    });
};
