import axiosInstance from "./base";

export const getAllCars = async () => {
  const res = await axiosInstance.get("/cars");
  return res.data;
};

export const createCars = async (serviceData) => {
  const res = await axiosInstance.post("/cars", serviceData);
  return res.data;
};
