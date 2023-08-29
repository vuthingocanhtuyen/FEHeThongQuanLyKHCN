import axios from "axios";

export const axiosJWT = axios.create();

export const createQuanNhan = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/quannhan/create`,
    data
  );
  return res.data;
};

export const updateQuanNhan = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/quannhan/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsQuanNhan = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quannhan/get-details/${id}`);
  return res.data;
};
export const getQuanNhanByQuanNhanId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quannhan/get-by-id/${id}`);
  return res.data;
};

export const deleteQuanNhan = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/quannhan/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllQuanNhan = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quannhan/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyQuanNhan = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/quannhan/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quannhan/get-all-type`);
  return res.data;
};
