import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuaTrinhKyLuat = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/quatrinhkyluat/create`,
    data
  );
  return res.data;
};

export const updateQuaTrinhKyLuat = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/quatrinhkyluat/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsQuaTrinhKyLuat = async (id) => {
  // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkyluat/get-details/${id}`);
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkyluat/get-details/${id}`);
  console.log("res: ", res.data)
  return res.data;
};

export const getQuaTrinhKyLuatByQuanNhanId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkyluat/get-by-id/${id}`);
  return res.data;
};


export const deleteQuaTrinhKyLuat = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/quatrinhkyluat/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllQuaTrinhKyLuat = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhkyluat/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyQuaTrinhKyLuat = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/quatrinhkyluat/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkyluat/all-type`);
  return res.data;
};
