import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHinhThucGiangDay = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/hinhthucgiangday/create`,
        data
    );
    return res.data;
};

export const updateHinhThucGiangDay = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/hinhthucgiangday/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHinhThucGiangDay = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucgiangday/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucgiangday/get-details/${id}`);

    return res.data;
};

export const getHinhThucGiangDayByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucgiangday/get-by-id/${id}`);
    return res.data;
};


export const deleteHinhThucGiangDay = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/hinhthucgiangday/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHinhThucGiangDay = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/hinhthucgiangday/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHinhThucGiangDay = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hinhthucgiangday/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucgiangday/get-all-type`);
    return res.data;
};
export const updateHinhThucGiangDayLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hinhthucgiangday/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};