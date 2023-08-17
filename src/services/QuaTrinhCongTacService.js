import axios from "axios";

export const axiosJWT = axios.create();

export const createQuaTrinhCongTac = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/quatrinhcongtac/create`,
    data
  );
  return res.data;
};

export const updateQuaTrinhCongTac = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/quatrinhcongtac/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsQuaTrinhCongTac = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhcongtac/get-details/${id}`);
  return res.data;
};
export const getQuaTrinhCongTacByQuanNhanId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhcongtac/get-by-id/${id}`);
  return res.data;
};

export const deleteQuaTrinhCongTac = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/quatrinhcongtac/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllQuaTrinhCongTac = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhcongtac/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyQuaTrinhCongTac = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/quatrinhcongtac/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhcongtac/all-type`);
  return res.data;
};
