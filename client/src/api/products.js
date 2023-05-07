import axios from "axios";
import { productsApiUrl } from "../consts";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${productsApiUrl}`);
    const products = res.data;
    return products;
  } catch (e) {
    console.log(e);
  }
};
