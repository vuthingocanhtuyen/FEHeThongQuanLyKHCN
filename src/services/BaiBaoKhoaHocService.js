import axios from "axios";

import { axiosJWT } from "./UserService"

export const createBaiBaoKH = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/baibaokhoahoc/create`,
        data
    );
    return res.data;
};

export const updateBaiBaoKH = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/baibaokhoahoc/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsBaiBaoKH = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/baibaokhoahoc/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/baibaokhoahoc/get-details/${id}`);

    return res.data;
};

export const getBaiBaoKHByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/baibaokhoahoc/get-by-id/${id}`);
    return res.data;
};


export const deleteBaiBaoKH = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/baibaokhoahoc/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllBaiBaoKH = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/baibaokhoahoc/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyBaiBaoKH = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/baibaokhoahoc/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/baibaokhoahoc/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/baibaokhoahoc/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};