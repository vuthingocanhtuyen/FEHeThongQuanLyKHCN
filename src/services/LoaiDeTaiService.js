import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiDeTai = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/loaidetai/create`,
        data
    );
    return res.data;
};

export const updateLoaiDeTai = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/loaidetai/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsLoaiDeTai = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidetai/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidetai/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getLoaiDeTaiByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidetai/get-by-id/${id}`);
    return res.data;
};


export const deleteLoaiDeTai = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/loaidetai/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllLoaiDeTai = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaidetai/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyLoaiDeTai = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaidetai/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaidetai/get-all-type`);
    return res.data;
};
