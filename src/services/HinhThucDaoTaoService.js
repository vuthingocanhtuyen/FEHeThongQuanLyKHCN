import axios from "axios";

import { axiosJWT } from "./UserService"

export const createHinhThucDaoTao = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/hinhthucdaotao/create`,
        data
    );
    return res.data;
};

export const updateHinhThucDaoTao = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/hinhthucdaotao/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsHinhThucDaoTao = async (id) => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdaotao/get-details/${id}`);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdaotao/get-details/${id}`);

    return res.data;
};

export const getHinhThucDaoTaoByQuanNhanId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdaotao/get-by-id/${id}`);
    return res.data;
};


export const deleteHinhThucDaoTao = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/hinhthucdaotao/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllHinhThucDaoTao = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/hinhthucdaotao/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyHinhThucDaoTao = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hinhthucdaotao/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/hinhthucdaotao/get-all-type`);
    return res.data;
};
export const updateHinhThucDaoTaoLists = async (id, data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/hinhthucdaotao/pushdata/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};