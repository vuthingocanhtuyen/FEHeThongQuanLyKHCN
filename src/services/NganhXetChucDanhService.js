import axios from "axios";

import { axiosJWT } from "./UserService"

export const createNganhXetChucDanh = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/nganhxetchucdanh/create`,
        data
    );
    return res.data;
};

export const updateNganhXetChucDanh = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/nganhxetchucdanh/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsNganhXetChucDanh = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/nganhxetchucdanh/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/nganhxetchucdanh/get-details/${id}`);
    console.log("res: ", res.data)
    return res.data;
};

export const getNganhXetChucDanhByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/nganhxetchucdanh/get-by-id/${id}`);
    return res.data;
};


export const deleteNganhXetChucDanh = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/nganhxetchucdanh/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllNganhXetChucDanh = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/nganhxetchucdanh/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyNganhXetChucDanh = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/nganhxetchucdanh/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/nganhxetchucdanh/get-all-type`);
    return res.data;
};
