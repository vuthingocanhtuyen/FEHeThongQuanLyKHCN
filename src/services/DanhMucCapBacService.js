import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucCapBac = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/danhmuccapbac/create`,
    data
  );
  return res.data;
};

export const updateDanhMucCapBac = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/danhmuccapbac/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsDanhMucCapBac = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuccapbac/get-details/${id}`);
  return res.data;
};
export const getDanhMucCapBacByDanhMucCapBacId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuccapbac/get-by-id/${id}`);
  return res.data;
};

export const deleteDanhMucCapBac = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/danhmuccapbac/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllDanhMucCapBac = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuccapbac/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyDanhMucCapBac = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/danhmuccapbac/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuccapbac/get-all-type`);
  return res.data;
};
