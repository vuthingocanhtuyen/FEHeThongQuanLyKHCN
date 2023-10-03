import axios from "axios";

import { axiosJWT } from "./UserService"

export const createThanNhan = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/thannhan/create`,
    data
  );
  return res.data;
};

export const updateThanNhan = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/thannhan/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsThanNhan = async (id) => {
  // const res = await axios.get(`${process.env.REACT_APP_API_URL}/thannhan/get-details/${id}`);
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/thannhan/get-details/${id}`);
  console.log("res: ", res.data)
  return res.data;
};

export const getThanNhanByQuanNhanId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/thannhan/get-by-id/${id}`);
  return res.data;
};


export const deleteThanNhan = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/thannhan/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllThanNhan = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/thannhan/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyThanNhan = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/thannhan/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/thannhan/all-type`);
  return res.data;
};
