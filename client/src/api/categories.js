import axios from "axios";
import { categoriesApiUrl } from "../consts";

export const getCategories = async () => {
  try {
    const res = await axios.get(`${categoriesApiUrl}`);
    const categories = res.data;
    return categories;
  } catch (e) {
    console.log(e);
  }
};

export const createCategory = async (category) => {
  try {
    const body = {
      title: category.title,
    };
    const res = await axios.post(`${categoriesApiUrl}`, body);
    const categories = res.data;
    return categories;
  } catch (e) {
    console.log(e);
  }
};
