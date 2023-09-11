import axios from "axios";

import { axiosJWT } from "./UserService"

export const createTaiHuongDan = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/taihuongdan/create`,
        data
    );
    return res.data;
};

export const updateTaiHuongDan = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/taihuongdan/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsTaiHuongDan = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihuongdan/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihuongdan/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getTaiHuongDanByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihuongdan/get-by-id/${id}`);
    return res.data;
};


export const deleteTaiHuongDan = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/taihuongdan/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllTaiHuongDan = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/taihuongdan/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyTaiHuongDan = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/taihuongdan/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/taihuongdan/all-type`);
    return res.data;
};
