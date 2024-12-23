import axiosInstance from "./base";

export const getAllCars = async () => {
  const res = await axiosInstance.get("/cars");
  return res.data;
};

export const createCars = async (serviceData) => {
  const res = await axiosInstance.post("/cars", serviceData);
  return res.data;
};

export const updateCar = async (id, data) => {
  const res = await axiosInstance.patch(`/cars/${id}`, data);
  return res.data;
};

export const deleteCar = async (id) => {
  const res = await axiosInstance.delete(`/cars/${id}`);
  return res.data;
};
