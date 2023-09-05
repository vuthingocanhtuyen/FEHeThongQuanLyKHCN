import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucChucVu = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmucchucvu/create`,
        data
    );
    return res.data;
};

export const updateDanhMucChucVu = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmucchucvu/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucChucVu = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchucvu/get-details/${id}`);
    return res.data;
};
export const getDanhMucChucVuByDanhMucChucVuId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchucvu/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucChucVu = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmucchucvu/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucChucVu = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmucchucvu/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucChucVu = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmucchucvu/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchucvu/get-all-type`);
    return res.data;
};
