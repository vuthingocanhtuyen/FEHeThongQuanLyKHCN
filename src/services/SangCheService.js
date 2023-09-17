import axios from "axios";

import { axiosJWT } from "./UserService"

export const createSangChe = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/sangche/create`,
        data
    );
    return res.data;
};

export const updateSangChe = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/sangche/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsSangChe = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/sangche/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sangche/get-details/${id}`);

    return res.data;
};

export const getSangCheByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sangche/get-by-id/${id}`);
    return res.data;
};


export const deleteSangChe = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/sangche/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllSangChe = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/sangche/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManySangChe = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/sangche/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sangche/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/sangche/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};