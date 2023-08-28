import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucHuyen = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuchuyen/create`,
        data
    );
    return res.data;
};

export const updateDanhMucHuyen = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuchuyen/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucHuyen = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchuyen/get-details/${id}`);
    return res.data;
};
export const getDanhMucHuyenByDanhMucHuyenId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchuyen/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucHuyen = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuchuyen/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucHuyen = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuchuyen/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucHuyen = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuchuyen/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchuyen/get-all-type`);
    return res.data;
};
