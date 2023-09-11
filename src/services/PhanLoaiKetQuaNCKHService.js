import axios from "axios";

import { axiosJWT } from "./UserService"

export const createPhanLoaiKetQuan = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/phanloaiketqua/create`,
        data
    );
    return res.data;
};

export const updatePhanLoaiKetQuan = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/phanloaiketqua/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsPhanLoaiKetQuan = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/phanloaiketqua/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/phanloaiketqua/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getPhanLoaiKetQuanByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/phanloaiketqua/get-by-id/${id}`);
    return res.data;
};


export const deletePhanLoaiKetQuan = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/phanloaiketqua/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllPhanLoaiKetQuan = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/phanloaiketqua/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyPhanLoaiKetQuan = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/phanloaiketqua/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/phanloaiketqua/get-all-type`);
    return res.data;
};
