import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiQuanHe = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/loaiquanhe/create`,
    data
  );
  return res.data;
};

export const updateLoaiQuanHe = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/loaiquanhe/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsLoaiQuanHe = async (id) => {
  // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaiquanhe/get-details/${id}`);
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaiquanhe/get-details/${id}`);
  console.log("res: ", res.data)
  return res.data;
};



export const deleteLoaiQuanHe = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/loaiquanhe/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllLoaiQuanHe = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaiquanhe/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyLoaiQuanHe = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/loaiquanhe/delete-many`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllType = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaiquanhe/get-all-type`);
  return res.data;
};
