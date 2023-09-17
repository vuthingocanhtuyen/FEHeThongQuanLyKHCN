import axios from "axios";

import { axiosJWT } from "./UserService"

export const createDeTaiNCKH = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/detainckh/create`,
        data
    );
    return res.data;
};

export const updateDeTaiNCKH = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/detainckh/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDeTaiNCKH = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/detainckh/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/detainckh/get-details/${id}`);

    return res.data;
};

export const getDeTaiNCKHByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/detainckh/get-by-id/${id}`);
    return res.data;
};


export const deleteDeTaiNCKH = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/detainckh/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDeTaiNCKH = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/detainckh/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDeTaiNCKH = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/detainckh/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/detainckh/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/detainckh/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};