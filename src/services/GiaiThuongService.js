import axios from "axios";

import { axiosJWT } from "./UserService"

export const createGiaiThuongNCKH = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/giaithuong/create`,
        data
    );
    return res.data;
};

export const updateGiaiThuongNCKH = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/giaithuong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsGiaiThuongNCKH = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/giaithuong/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/giaithuong/get-details/${id}`);

    return res.data;
};

export const getGiaiThuongNCKHByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/giaithuong/get-by-id/${id}`);
    return res.data;
};


export const deleteGiaiThuongNCKH = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/giaithuong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllGiaiThuongNCKH = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/giaithuong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyGiaiThuongNCKH = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/giaithuong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/giaithuong/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/giaithuong/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};