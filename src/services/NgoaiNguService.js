import axios from "axios";

import { axiosJWT } from "./UserService"

export const createNgoaiNgu = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/ngoaingu/create`,
        data
    );
    return res.data;
};

export const updateNgoaiNgu = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/ngoaingu/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsNgoaiNgu = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngoaingu/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngoaingu/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getNgoaiNguByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngoaingu/get-by-id/${id}`);
    return res.data;
};


export const deleteNgoaiNgu = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/ngoaingu/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllNgoaiNgu = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/ngoaingu/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyNgoaiNgu = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/ngoaingu/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ngoaingu/all-type`);
    return res.data;
};
