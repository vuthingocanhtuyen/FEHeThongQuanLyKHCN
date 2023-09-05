import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuanHam = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/quanham/create`,
        data
    );
    return res.data;
};

export const updateQuanHam = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/quanham/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQuanHam = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quanham/get-details/${id}`);
    return res.data;
};
export const getQuanHamByQuanHamId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quanham/get-by-id/${id}`);
    return res.data;
};

export const deleteQuanHam = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/quanham/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQuanHam = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quanham/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQuanHam = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/quanham/delete-many`,
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
