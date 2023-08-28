import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucKhenThuong = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuckhenthuong/create`,
        data
    );
    return res.data;
};

export const updateDanhMucKhenThuong = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuckhenthuong/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucKhenThuong = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckhenthuong/get-details/${id}`);
    return res.data;
};
export const getDanhMucKhenThuongByDanhMucKhenThuongId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckhenthuong/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucKhenThuong = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuckhenthuong/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucKhenThuong = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuckhenthuong/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucKhenThuong = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuckhenthuong/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuckhenthuong/get-all-type`);
    return res.data;
};
