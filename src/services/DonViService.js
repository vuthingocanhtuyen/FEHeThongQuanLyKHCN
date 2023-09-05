import axios from "axios";

export const axiosJWT = axios.create();

export const createDonVi = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/donvi/create`,
    data
  );
  return res.data;
};

export const updateDonVi = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/donvi/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsDonVi = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/donvi/get-details/${id}`);
  return res.data;
};
export const getDonViByDonViId = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/donvi/get-by-id/${id}`);
  return res.data;
};

export const deleteDonVi = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/donvi/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllDonVi = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/donvi/get-all`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyDonVi = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/donvi/delete-many`,
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
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/donvi/get-all-type`);
  return res.data;
};
export const getDonViCon = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/donvi/getdonvicon/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };
  export const getDonViConOnly = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/donvi/getdonvicononly/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };
  export const getDonViConByTen = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/donvi/getdonviconbyten/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };    
  export const getDonViConOnly2 = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/donvi/getdonvicononly2/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };  
  export const getDonVifromcode = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/donvi/getdonvifromcode/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };  
  export const getHocVifromcode = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/donvi/gethocvi/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };  
  export const getDonVifromObjectId = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/donvi/getdonvi/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };  