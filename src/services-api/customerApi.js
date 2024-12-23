import axiosInstance from "./base";

export const getAll = async () => {
  const res = await axiosInstance.get("/customers");
  return res.data;
};

export const createCustomer = async (data) => {
  const res = await axiosInstance.post("/customers", data);
  return res.data;
};

export const updateCustomer = async (id, data) => {
  const res = await axiosInstance.patch(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id) => {
  const res = await axiosInstance.delete(`/customers/${id}`);
  return res.data;
};
