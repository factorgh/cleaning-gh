import axiosInstance from "./base";

export const getAllService = async () => {
  const res = await axiosInstance.get("/services");
  return res.data;
};

export const createService = async (serviceData) => {
  const res = await axiosInstance.post("/services", serviceData);
  return res.data;
};

export const updateService = async (id, data) => {
  const res = await axiosInstance.patch(`/services/${id}`, data);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await axiosInstance.delete(`/services/${id}`);
  return res.data;
};
