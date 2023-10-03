import axios from "axios";

import { axiosJWT } from "./UserService"

export const createNhomHoatDongNC = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/nhomhoatdongnc/create`,
        data
    );
    return res.data;
};

export const updateNhomHoatDongNC = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/nhomhoatdongnc/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsNhomHoatDongNC = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/nhomhoatdongnc/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/nhomhoatdongnc/get-details/${id}`);

    return res.data;
};

export const getNhomHoatDongNCByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/nhomhoatdongnc/get-by-id/${id}`);
    return res.data;
};


export const deleteNhomHoatDongNC = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/nhomhoatdongnc/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllNhomHoatDongNC = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/nhomhoatdongnc/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyNhomHoatDongNC = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/nhomhoatdongnc/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/nhomhoatdongnc/get-all-type`);
    return res.data;
};
export const updateNhomHoatDongNCLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/nhomhoatdongnc/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};