import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHTCV = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/htcv/create`,
        data
    );
    return res.data;
};

export const updateHTCV = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/htcv/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHTCV = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/htcv/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/htcv/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getHTCVByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/htcv/get-by-id/${id}`);
    return res.data;
};


export const deleteHTCV = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/htcv/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHTCV = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/htcv/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHTCV = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/htcv/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/htcv/all-type`);
    return res.data;
};
