import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiTapChi = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/loaitapchi/create`,
        data
    );
    return res.data;
};

export const updateLoaiTapChi = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/loaitapchi/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsLoaiTapChi = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaitapchi/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaitapchi/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getLoaiTapChiByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaitapchi/get-by-id/${id}`);
    return res.data;
};


export const deleteLoaiTapChi = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/loaitapchi/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllLoaiTapChi = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaitapchi/get-all-type`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyLoaiTapChi = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaitapchi/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaitapchi/get-all-type`);
    return res.data;
};
