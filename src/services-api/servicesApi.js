import axiosInstance from "./base";

export const getAllService = async () => {
  const res = await axiosInstance.get("/services");
  return res.data;
};

export const createService = async (serviceData) => {
  const res = await axiosInstance.post("/services", serviceData);
  return res.data;
};
