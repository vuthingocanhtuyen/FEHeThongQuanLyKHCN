import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHinhThucDeTai = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/hinhthucdetai/create`,
        data
    );
    return res.data;
};

export const updateHinhThucDeTai = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/hinhthucdetai/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHinhThucDeTai = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdetai/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdetai/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getHinhThucDeTaiByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdetai/get-by-id/${id}`);
    return res.data;
};


export const deleteHinhThucDeTai = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/hinhthucdetai/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHinhThucDeTai = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/hinhthucdetai/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHinhThucDeTai = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hinhthucdetai/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdetai/get-all-type`);
    return res.data;
};
