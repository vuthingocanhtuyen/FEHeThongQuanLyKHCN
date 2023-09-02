import axios from "axios";

export const axiosJWT = axios.create();


export const getPriorityByUser = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/priorityfromid/getpriorityfromuser/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };
  export const getPriorityByAdminGroup = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/priorityfromid/priorityfromadmingroup/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };
  export const getChucVuDonViFromUser = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/priorityfromid/get-by-id/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };
  export const getChucVuDonViFromUser2 = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/priorityfromid/get-by-id2/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };
