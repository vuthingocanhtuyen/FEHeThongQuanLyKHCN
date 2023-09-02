import axios from "axios";

import { axiosJWT } from "./UserService"

export const createTinhTrangCongTac = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/tinhtrangcongtac/create`,
        data
    );
    return res.data;
};

export const updateTinhTrangCongTac = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/tinhtrangcongtac/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsTinhTrangCongTac = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/tinhtrangcongtac/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tinhtrangcongtac/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getTinhTrangCongTacByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tinhtrangcongtac/get-by-id/${id}`);
    return res.data;
};


export const deleteTinhTrangCongTac = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/tinhtrangcongtac/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllTinhTrangCongTac = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/tinhtrangcongtac/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyTinhTrangCongTac = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/tinhtrangcongtac/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tinhtrangcongtac/all-type`);
    return res.data;
};
