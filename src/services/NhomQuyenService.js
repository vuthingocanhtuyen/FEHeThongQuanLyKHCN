import axios from "axios";

export const axiosJWT = axios.create();

export const createNhomQuyen = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/nhomquyen/create`,
    data
  );
  return res.data;
};

export const updateNhomQuyen = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/nhomquyen/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsNhomQuyen = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/nhomquyen/get-details/${id}`);
  return res.data;
};
export const getNhomQuyenByNhomQuyenId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/nhomquyen/get-by-id/${id}`);
  return res.data;
};

export const deleteNhomQuyen = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/nhomquyen/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllNhomQuyen = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/nhomquyen/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyNhomQuyen = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/nhomquyen/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/nhomquyen/get-all-type`);
  return res.data;
};
