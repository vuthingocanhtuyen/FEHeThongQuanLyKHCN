import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiDangKy = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/loaidangky/create`,
        data
    );
    return res.data;
};

export const updateLoaiDangKy = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/loaidangky/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsLoaiDangKy = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidangky/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidangky/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getLoaiDangKyByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidangky/get-by-id/${id}`);
    return res.data;
};


export const deleteLoaiDangKy = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/loaidangky/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllLoaiDangKy = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaidangky/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyLoaiDangKy = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaidangky/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidangky/get-all-type`);
    return res.data;
};
