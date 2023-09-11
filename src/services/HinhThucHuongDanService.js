import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHinhThucHuongDan = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/hinhthuchuongdan/create`,
        data
    );
    return res.data;
};

export const updateHinhThucHuongDan = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/hinhthuchuongdan/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHinhThucHuongDan = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuchuongdan/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuchuongdan/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getHinhThucHuongDanByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuchuongdan/get-by-id/${id}`);
    return res.data;
};


export const deleteHinhThucHuongDan = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/hinhthuchuongdan/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHinhThucHuongDan = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/hinhthuchuongdan/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHinhThucHuongDan = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hinhthuchuongdan/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuchuongdan/get-all-type`);
    return res.data;
};
