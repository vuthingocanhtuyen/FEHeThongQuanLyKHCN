import axios from "axios";

import { axiosJWT } from "./UserService"

export const createBienSoan = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/biensoan/create`,
        data
    );
    return res.data;
};

export const updateBienSoan = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/biensoan/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsBienSoan = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/biensoan/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/biensoan/get-details/${id}`);

    return res.data;
};

export const getBienSoanByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/biensoan/get-by-id/${id}`);
    return res.data;
};


export const deleteBienSoan = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/biensoan/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllBienSoan = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/biensoan/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyBienSoan = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/biensoan/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/biensoan/all-type`);
    return res.data;
};
export const updateHTCVLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/biensoan/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};