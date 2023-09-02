import axios from "axios";

import { axiosJWT } from "./UserService"

export const createDaiHoc = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/daihoc/create`,
        data
    );
    return res.data;
};

export const updateDaiHoc = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/daihoc/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDaiHoc = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/daihoc/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/daihoc/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getDaiHocByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/daihoc/get-by-id/${id}`);
    return res.data;
};


export const deleteDaiHoc = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/daihoc/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDaiHoc = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/daihoc/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDaiHoc = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/daihoc/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/daihoc/all-type`);
    return res.data;
};
