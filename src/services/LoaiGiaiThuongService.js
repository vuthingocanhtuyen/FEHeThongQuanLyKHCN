import axios from "axios";

import { axiosJWT } from "./UserService"

export const createLoaiGiaiThuong = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/loaigiaithuong/create`,
        data
    );
    return res.data;
};

export const updateLoaiGiaiThuong = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/loaigiaithuong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsLoaiGiaiThuong = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaigiaithuong/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaigiaithuong/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getLoaiGiaiThuongByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaigiaithuong/get-by-id/${id}`);
    return res.data;
};


export const deleteLoaiGiaiThuong = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/loaigiaithuong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllLoaiGiaiThuong = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/loaigiaithuong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyLoaiGiaiThuong = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/loaigiaithuong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaigiaithuong/get-all-type`);
    return res.data;
};
