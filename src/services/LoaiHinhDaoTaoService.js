import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiHinhDaoTao = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/loaihinhdaotao/create`,
        data
    );
    return res.data;
};

export const updateLoaiHinhDaoTao = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/loaihinhdaotao/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsLoaiHinhDaoTao = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihinhdaotao/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihinhdaotao/get-details/${id}`);

    return res.data;
};

export const getLoaiHinhDaoTaoByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihinhdaotao/get-by-id/${id}`);
    return res.data;
};


export const deleteLoaiHinhDaoTao = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/loaihinhdaotao/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllLoaiHinhDaoTao = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaihinhdaotao/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyLoaiHinhDaoTao = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaihinhdaotao/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaihinhdaotao/get-all-type`);
    return res.data;
};
export const updateLoaiHinhDaoTaoLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaihinhdaotao/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};