import axios from "axios";

import { axiosJWT } from "./UserService"

export const createVaiTroHoiDong = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/vaitrohoidong/create`,
        data
    );
    return res.data;
};

export const updateVaiTroHoiDong = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/vaitrohoidong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsVaiTroHoiDong = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitrohoidong/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitrohoidong/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getVaiTroHoiDongByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitrohoidong/get-by-id/${id}`);
    return res.data;
};


export const deleteVaiTroHoiDong = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/vaitrohoidong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllVaiTroHoiDong = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/vaitrohoidong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyVaiTroHoiDong = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/vaitrohoidong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitrohoidong/get-all-type`);
    return res.data;
};
