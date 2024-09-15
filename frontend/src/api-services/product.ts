/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/config";
import axios from "axios";

export const fetchProducts = async (filters: any) => {
  const token = localStorage.getItem("jwtToken");

  const response = await axios.get(`${config.API_BASE_URL}/products/all`, {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("res:", response);
  return response.data;
};

interface IProductInput {
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
}

export const fetchProductById = async (id: string) => {
  const token = localStorage.getItem("jwtToken");

  const response = await axios.get(`${config.API_BASE_URL}/products/by/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const createProduct = async (productData: IProductInput) => {
  const token = localStorage.getItem("jwtToken");

  const response = await axios.post(
    `${config.API_BASE_URL}/products/create`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
