import axios from "axios";

import { axiosJWT } from "./UserService"

export const createVaiTro = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/vaitro/create`,
        data
    );
    return res.data;
};

export const updateVaiTro = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/vaitro/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsVaiTro = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitro/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitro/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getVaiTroByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitro/get-by-id/${id}`);
    return res.data;
};


export const deleteVaiTro = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/vaitro/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllVaiTro = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/vaitro/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyVaiTro = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/vaitro/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/vaitro/get-all-type`);
    return res.data;
};
