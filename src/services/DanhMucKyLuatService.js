import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucKyLuat = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuckyluat/create`,
        data
    );
    return res.data;
};

export const updateDanhMucKyLuat = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuckyluat/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucKyLuat = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckyluat/get-details/${id}`);
    return res.data;
};
export const getDanhMucKyLuatByDanhMucKyLuatId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckyluat/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucKyLuat = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuckyluat/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucKyLuat = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuckyluat/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucKyLuat = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuckyluat/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckyluat/get-all-type`);
    return res.data;
};
