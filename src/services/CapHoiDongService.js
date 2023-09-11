import axios from "axios";

import { axiosJWT } from "./UserService"

export const createCapHoiDong = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/caphoidong/create`,
        data
    );
    return res.data;
};

export const updateCapHoiDong = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/caphoidong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsCapHoiDong = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/caphoidong/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/caphoidong/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getCapHoiDongByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/caphoidong/get-by-id/${id}`);
    return res.data;
};


export const deleteCapHoiDong = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/caphoidong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllCapHoiDong = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/caphoidong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyCapHoiDong = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/caphoidong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/caphoidong/get-all-type`);
    return res.data;
};
export const getAllTypeByLoaiHoiDong = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/caphoidong/get-all-typeloai`);
    return res.data;
};
