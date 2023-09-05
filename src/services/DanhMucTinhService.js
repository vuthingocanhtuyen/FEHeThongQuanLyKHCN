import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucTinh = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuctinh/create`,
        data
    );
    return res.data;
};

export const updateDanhMucTinh = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuctinh/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucTinh = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuctinh/get-details/${id}`);
    return res.data;
};
export const getDanhMucTinhByDanhMucTinhId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuctinh/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucTinh = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuctinh/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucTinh = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuctinh/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucTinh = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuctinh/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuctinh/get-all-type`);
    return res.data;
};
