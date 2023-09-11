import axios from "axios";

import { axiosJWT } from "./UserService"

export const createTaiHoiDong = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/taihoidong/create`,
        data
    );
    return res.data;
};

export const updateTaiHoiDong = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/taihoidong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsTaiHoiDong = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihoidong/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihoidong/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getTaiHoiDongByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihoidong/get-by-id/${id}`);
    return res.data;
};


export const deleteTaiHoiDong = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/taihoidong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllTaiHoiDong = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/taihoidong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyTaiHoiDong = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/taihoidong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihoidong/all-type`);
    return res.data;
};
