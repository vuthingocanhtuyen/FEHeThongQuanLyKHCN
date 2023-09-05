import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucKhuVucUT = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuckhuvucut/create`,
        data
    );
    return res.data;
};

export const updateDanhMucKhuVucUT = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuckhuvucut/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucKhuVucUT = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckhuvucut/get-details/${id}`);
    return res.data;
};
export const getDanhMucKhuVucUTByDanhMucKhuVucUTId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckhuvucut/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucKhuVucUT = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuckhuvucut/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucKhuVucUT = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuckhuvucut/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucKhuVucUT = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuckhuvucut/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckhuvucut/get-all-type`);
    return res.data;
};
