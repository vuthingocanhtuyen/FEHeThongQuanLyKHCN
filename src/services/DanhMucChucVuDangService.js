import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucChucVuDang = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmucchucvudang/create`,
        data
    );
    return res.data;
};

export const updateDanhMucChucVuDang = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmucchucvudang/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucChucVuDang = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchucvudang/get-details/${id}`);
    return res.data;
};
export const getDanhMucChucVuDangByDanhMucChucVuDangId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchucvudang/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucChucVuDang = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmucchucvudang/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucChucVuDang = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmucchucvudang/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucChucVuDang = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmucchucvudang/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchucvudang/get-all-type`);
    return res.data;
};
