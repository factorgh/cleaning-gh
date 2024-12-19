import axiosInstance from "./base";

export const getAll = async () => {
  const res = await axiosInstance.get("/customers");
  return res.data;
};

export const createCustomer = async (data) => {
  const res = await axiosInstance.post("/customers", data);
  return res.data;
};
