import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHuongDanNCKH = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/huongdannckh/create`,
        data
    );
    return res.data;
};

export const updateHuongDanNCKH = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/huongdannckh/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHuongDanNCKH = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/huongdannckh/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/huongdannckh/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getHuongDanNCKHByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/huongdannckh/get-by-id/${id}`);
    return res.data;
};


export const deleteHuongDanNCKH = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/huongdannckh/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHuongDanNCKH = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/huongdannckh/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHuongDanNCKH = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/huongdannckh/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/huongdannckh/all-type`);
    return res.data;
};
