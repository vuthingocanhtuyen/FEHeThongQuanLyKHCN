import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucXa = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmucxa/create`,
        data
    );
    return res.data;
};

export const updateDanhMucXa = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmucxa/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucXa = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucxa/get-details/${id}`);
    return res.data;
};
export const getDanhMucXaByDanhMucXaId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucxa/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucXa = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmucxa/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucXa = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmucxa/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucXa = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmucxa/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucxa/get-all-type`);
    return res.data;
};
