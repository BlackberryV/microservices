import axios from "axios";
import { sellersApiUrl } from "../consts";

export const getSellers = async () => {
  try {
    const res = await axios.get(`${sellersApiUrl}`);
    const sellers = res.data;
    return sellers;
  } catch (e) {
    console.log(e);
  }
};
