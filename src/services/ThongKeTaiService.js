import axios from "axios";

import { axiosJWT } from "./UserService"

export const createThongKeTai = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/thongketai/create`,
        data
    );
    return res.data;
};

export const updateThongKeTai = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/thongketai/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsThongKeTai = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/thongketai/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/thongketai/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getThongKeTaiByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/thongketai/get-by-id/${id}`);
    return res.data;
};


export const deleteThongKeTai = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/thongketai/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllThongKeTai = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/thongketai/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyThongKeTai = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/thongketai/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/thongketai/all-type`);
    return res.data;
};
