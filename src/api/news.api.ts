import axiosInstance from "./axiosClient";

export const getNews = async () => {
  const response = await axiosInstance.get('/news');
  return response.data;
};