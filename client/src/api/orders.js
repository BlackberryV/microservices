import axios from "axios";
import { ordersApiUrl } from "../constants";

export const getOrders = async () => {
  try {
    const res = await axios.get(`${ordersApiUrl}`);
    const orders = res.data;
    return orders;
  } catch (e) {
    console.log(e);
  }
};

export const createOrder = async (sellerId, productId) => {
  try {
    const res = await axios.post(`${ordersApiUrl}`, {
      sellerId: sellerId,
      productId: productId,
    });
    const product = res.data;
    return product;
  } catch (e) {
    console.log(e);
  }
};
