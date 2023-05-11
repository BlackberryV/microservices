import axios from "axios";
import { sellersApiUrl } from "../constants";

export const getSellers = async () => {
  try {
    const res = await axios.get(`${sellersApiUrl}`);
    const sellers = res.data;
    return sellers;
  } catch (e) {
    console.log(e);
  }
};

export const createSeller = async (name, phoneNumber) => {
  try {
    const res = await axios.post(`${sellersApiUrl}`, {
      name: name,
      phoneNumber: phoneNumber,
    });
    const seller = res.data;
    return seller;
  } catch (e) {
    console.log(e);
  }
};

export const deleteSeller = (id) => {
  return axios
    .delete(`${sellersApiUrl}${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting seller:", error);
      throw error.response?.data ?? { error: "Failed to delete seller" };
    });
};

export const editSeller = (id, name, phoneNumber) => {
  return axios
    .put(`${sellersApiUrl}${id}`, {
      name: name,
      phoneNumber: phoneNumber,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating seller:", error);
      throw error.response?.data ?? { error: "Failed to update seller" };
    });
};
