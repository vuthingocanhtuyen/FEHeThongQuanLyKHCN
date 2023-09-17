import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHopDong = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/hopdong/create`,
        data
    );
    return res.data;
};

export const updateHopDong = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/hopdong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHopDong = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/hopdong/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hopdong/get-details/${id}`);

    return res.data;
};

export const getHopDongByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hopdong/get-by-id/${id}`);
    return res.data;
};


export const deleteHopDong = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/hopdong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHopDong = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/hopdong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHopDong = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hopdong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hopdong/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hopdong/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};