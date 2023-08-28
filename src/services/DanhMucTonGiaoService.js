import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucTonGiao = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuctongiao/create`,
        data
    );
    return res.data;
};

export const updateDanhMucTonGiao = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuctongiao/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucTonGiao = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuctongiao/get-details/${id}`);
    return res.data;
};
export const getDanhMucTonGiaoByDanhMucTonGiaoId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuctongiao/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucTonGiao = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuctongiao/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucTonGiao = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuctongiao/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucTonGiao = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuctongiao/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuctongiao/get-all-type`);
    return res.data;
};
