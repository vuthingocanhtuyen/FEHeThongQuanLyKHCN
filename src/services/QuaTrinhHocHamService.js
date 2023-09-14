import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuaTrinhHocHam = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/quatrinhhocham/create`,
        data
    );
    return res.data;
};

export const updateQuaTrinhHocHam = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/quatrinhhocham/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQuaTrinhHocHam = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocham/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocham/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getQuaTrinhHocHamByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocham/get-by-id/${id}`);
    return res.data;
};


export const deleteQuaTrinhHocHam = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/quatrinhhocham/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQuaTrinhHocHam = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhhocham/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQuaTrinhHocHam = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/quatrinhhocham/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhocham/all-type`);
    return res.data;
};
