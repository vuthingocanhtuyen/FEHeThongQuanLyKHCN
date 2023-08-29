import axios from "axios";

export const axiosJWT = axios.create();

export const createPriority = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/priority/create`,
    data
  );
  return res.data;
};

export const updatePriority = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/priority/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsPriority = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/priority/get-details/${id}`);
  return res.data;
};
export const getPriorityByPriorityId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/priority/get-by-id/${id}`);
  return res.data;
};

export const deletePriority = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/priority/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllPriority = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/priority/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyPriority = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/priority/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/priority/get-all-type`);
  return res.data;
};
