import config from "@/config";
import axios from "axios";

export const fetchCategories = async () => {
  const token = localStorage.getItem("jwtToken");

  const response = await axios.get(`${config.API_BASE_URL}/category/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
