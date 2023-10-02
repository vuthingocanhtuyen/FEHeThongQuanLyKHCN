import axios from "axios";

import { axiosJWT } from "./UserService"

export const createNgonNgu = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/ngonngu/create`,
        data
    );
    return res.data;
};

export const updateNgonNgu = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/ngonngu/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsNgonNgu = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngonngu/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngonngu/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getNgonNguByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngonngu/get-by-id/${id}`);
    return res.data;
};


export const deleteNgonNgu = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/ngonngu/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllNgonNgu = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/ngonngu/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyNgonNgu = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/ngonngu/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngonngu/get-all-type`);
    return res.data;
};
