import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQTCTDang = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/create`,
        data
    );
    return res.data;
};

export const updateQTCTDang = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQTCTDang = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getQTCTDangByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/get-by-id/${id}`);
    return res.data;
};


export const deleteQTCTDang = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQTCTDang = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQTCTDang = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhsinhhoatdang/all-type`);
    return res.data;
};
