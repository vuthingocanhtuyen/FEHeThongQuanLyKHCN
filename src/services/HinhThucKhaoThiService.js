import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHinhThucKhaoThi = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/hinhthuckhaothi/create`,
        data
    );
    return res.data;
};

export const updateHinhThucKhaoThi = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/hinhthuckhaothi/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHinhThucKhaoThi = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuckhaothi/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuckhaothi/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getHinhThucKhaoThiByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuckhaothi/get-by-id/${id}`);
    return res.data;
};


export const deleteHinhThucKhaoThi = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/hinhthuckhaothi/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHinhThucKhaoThi = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/hinhthuckhaothi/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHinhThucKhaoThi = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hinhthuckhaothi/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthuckhaothi/get-all-type`);
    return res.data;
};
