import axios from "axios";

import { axiosJWT } from "./UserService"

export const createTaiKhaoThi = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/taikhaothi/create`,
        data
    );
    return res.data;
};

export const updateTaiKhaoThi = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/taikhaothi/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsTaiKhaoThi = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/taikhaothi/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taikhaothi/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getTaiKhaoThiByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taikhaothi/get-by-id/${id}`);
    return res.data;
};


export const deleteTaiKhaoThi = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/taikhaothi/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllTaiKhaoThi = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/taikhaothi/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyTaiKhaoThi = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/taikhaothi/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taikhaothi/all-type`);
    return res.data;
};
