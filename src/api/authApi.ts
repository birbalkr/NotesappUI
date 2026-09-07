import axiosInstance from "./axiosConfig";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export const registerApi = async (data: any) => {
  console.log(`${API_URL}/register`);
  const response = await axiosInstance.post(`${API_URL}/register`, data);

  return response.data;
};

export const loginApi = async (data: any) => {
  const response = await axiosInstance.post(`${API_URL}/login`, data);

  return response.data;
};

export const forgotPasswordApi = async (data: any) => {
  const response = await axiosInstance.post(`${API_URL}/forgot-password`, data);

  return response.data;
};

export const profile = async () => {
  const response = await axiosInstance.get(`${API_URL}/me`);

  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post(
    `${API_URL}/logout`,
    {}
  );

  return response.data;
};
