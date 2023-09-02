import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucCDCMKT = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuccdcmkt/create`,
        data
    );
    return res.data;
};

export const updateDanhMucCDCMKT = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuccdcmkt/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucCDCMKT = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuccdcmkt/get-details/${id}`);
    return res.data;
};
export const getDanhMucCDCMKTByDanhMucCDCMKTId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuccdcmkt/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucCDCMKT = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuccdcmkt/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucCDCMKT = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuccdcmkt/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucCDCMKT = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuccdcmkt/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuccdcmkt/get-all-type`);
    return res.data;
};
