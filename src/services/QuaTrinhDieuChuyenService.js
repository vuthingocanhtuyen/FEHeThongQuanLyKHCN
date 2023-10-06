import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuaTrinhDieuChuyen = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/dieuchuyencanbo/create`,
        data
    );
    return res.data;
};

export const updateQuaTrinhDieuChuyen = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/dieuchuyencanbo/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQuaTrinhDieuChuyen = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/dieuchuyencanbo/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/dieuchuyencanbo/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getQuaTrinhDieuChuyenByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/dieuchuyencanbo/get-by-id/${id}`);
    return res.data;
};


export const deleteQuaTrinhDieuChuyen = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/dieuchuyencanbo/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQuaTrinhDieuChuyen = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/dieuchuyencanbo/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQuaTrinhDieuChuyen = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/dieuchuyencanbo/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/dieuchuyencanbo/all-type`);
    return res.data;
};
