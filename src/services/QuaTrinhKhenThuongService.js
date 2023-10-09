import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuaTrinhKhenThuong = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/create`,
    data
  );
  return res.data;
};

export const updateQuaTrinhKhenThuong = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsQuaTrinhKhenThuong = async (id) => {
  // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/get-details/${id}`);
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/get-details/${id}`);
  console.log("res: ", res.data)
  return res.data;
};

export const getQuaTrinhKhenThuongByQuanNhanId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/get-by-id/${id}`);
  return res.data;
};


export const deleteQuaTrinhKhenThuong = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllQuaTrinhKhenThuong = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyQuaTrinhKhenThuong = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhkhenthuong/all-type`);
  return res.data;
};
