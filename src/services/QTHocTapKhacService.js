import axios from "axios";

import { axiosJWT } from "./UserService"

export const createQuaTrinhHocTapKhac = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/create`,
        data
    );
    return res.data;
};

export const updateQuaTrinhHocTapKhac = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsQuaTrinhHocTapKhac = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getQuaTrinhHocTapKhacByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/get-by-id/${id}`);
    return res.data;
};


export const deleteQuaTrinhHocTapKhac = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllQuaTrinhHocTapKhac = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyQuaTrinhHocTapKhac = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/quatrinhhoctapkhac/all-type`);
    return res.data;
};
