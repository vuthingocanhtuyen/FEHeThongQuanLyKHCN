import axios from "axios";

import { axiosJWT } from "./UserService"

export const createTaiGiangDay = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/taigiangday/create`,
        data
    );
    return res.data;
};

export const updateTaiGiangDay = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/taigiangday/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsTaiGiangDay = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/taigiangday/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taigiangday/get-details/${id}`);

    return res.data;
};

export const getTaiGiangDayByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taigiangday/get-by-id/${id}`);
    return res.data;
};


export const deleteTaiGiangDay = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/taigiangday/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllTaiGiangDay = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/taigiangday/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyTaiGiangDay = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/taigiangday/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taigiangday/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/taigiangday/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getTongTaiFromId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taigiangday/get-tong/${id}`);
    return res.data;
};

