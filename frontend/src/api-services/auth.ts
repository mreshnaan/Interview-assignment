import config from "@/config";
import axios from "axios";

interface ILoginInput {
  email: string;
  password: string;
}

export const loginUser = async (loginData: ILoginInput) => {
  const response = await axios.post(`${config.API_BASE_URL}/auth/login`, loginData);
  return response.data.data;
};
