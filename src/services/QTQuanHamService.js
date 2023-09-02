import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuaTrinhQuanHam = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/quatrinhquanham/create`,
        data
    );
    return res.data;
};

export const updateQuaTrinhQuanHam = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/quatrinhquanham/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQuaTrinhQuanHam = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhquanham/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhquanham/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getQuaTrinhQuanHamByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhquanham/get-by-id/${id}`);
    return res.data;
};


export const deleteQuaTrinhQuanHam = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/quatrinhquanham/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQuaTrinhQuanHam = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhquanham/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQuaTrinhQuanHam = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/quatrinhquanham/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhquanham/all-type`);
    return res.data;
};
