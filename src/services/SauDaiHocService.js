import axios from "axios";

import { axiosJWT } from "./UserService"

export const createSauDaiHoc = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/saudaihoc/create`,
        data
    );
    return res.data;
};

export const updateSauDaiHoc = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/saudaihoc/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsSauDaiHoc = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/saudaihoc/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/saudaihoc/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getSauDaiHocByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/saudaihoc/get-by-id/${id}`);
    return res.data;
};


export const deleteSauDaiHoc = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/saudaihoc/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllSauDaiHoc = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/saudaihoc/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManySauDaiHoc = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/saudaihoc/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/saudaihoc/all-type`);
    return res.data;
};
