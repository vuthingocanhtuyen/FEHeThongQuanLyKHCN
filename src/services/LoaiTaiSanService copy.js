import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiTaiSan = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/loaitaisan/create`,
    data
  );
  return res.data;
};

export const updateLoaiTaiSan = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/loaitaisan/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsLoaiTaiSan = async (id) => {
  // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaitaisan/get-details/${id}`);
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaitaisan/get-details/${id}`);
  console.log("res: ", res.data)
  return res.data;
};


export const deleteLoaiTaiSan = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/loaitaisan/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllLoaiTaiSan = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaitaisan/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyLoaiTaiSan = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/loaitaisan/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaitaisan/get-all-type`);
  return res.data;
};
