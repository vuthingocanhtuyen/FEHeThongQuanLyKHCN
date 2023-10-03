import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuaTrinhHocVi = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/quatrinhhocvi/create`,
        data
    );
    return res.data;
};

export const updateQuaTrinhHocVi = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/quatrinhhocvi/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQuaTrinhHocVi = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocvi/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocvi/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getQuaTrinhHocViByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocvi/get-by-id/${id}`);
    return res.data;
};


export const deleteQuaTrinhHocVi = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/quatrinhhocvi/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQuaTrinhHocVi = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhhocvi/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQuaTrinhHocVi = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/quatrinhhocvi/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocvi/all-type`);
    return res.data;
};
