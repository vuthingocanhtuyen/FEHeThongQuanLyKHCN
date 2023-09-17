import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHoatDongKhac = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/hoatdongkhac/create`,
        data
    );
    return res.data;
};

export const updateHoatDongKhac = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/hoatdongkhac/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHoatDongKhac = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/hoatdongkhac/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hoatdongkhac/get-details/${id}`);

    return res.data;
};

export const getHoatDongKhacByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hoatdongkhac/get-by-id/${id}`);
    return res.data;
};


export const deleteHoatDongKhac = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/hoatdongkhac/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHoatDongKhac = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/hoatdongkhac/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHoatDongKhac = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hoatdongkhac/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hoatdongkhac/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hoatdongkhac/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};