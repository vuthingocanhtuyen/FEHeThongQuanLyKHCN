import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiHoatDong = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/loaihoatdong/create`,
        data
    );
    return res.data;
};

export const updateLoaiHoatDong = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/loaihoatdong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsLoaiHoatDong = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihoatdong/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihoatdong/get-details/${id}`);

    return res.data;
};

export const getLoaiHoatDongByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihoatdong/get-by-id/${id}`);
    return res.data;
};


export const deleteLoaiHoatDong = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/loaihoatdong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllLoaiHoatDong = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaihoatdong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyLoaiHoatDong = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaihoatdong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihoatdong/get-all-type`);
    return res.data;
};
export const updateLoaiHoatDongLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaihoatdong/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};