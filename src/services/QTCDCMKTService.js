import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQTCDCMKT = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/create`,
        data
    );
    return res.data;
};

export const updateQTCDCMKT = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQTCDCMKT = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getQTCDCMKTByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/get-by-id/${id}`);
    return res.data;
};


export const deleteQTCDCMKT = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQTCDCMKT = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQTCDCMKT = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhcdcmkt/all-type`);
    return res.data;
};
