import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucLoaiDonVi = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmucloaidonvi/create`,
        data
    );
    return res.data;
};

export const updateDanhMucLoaiDonVi = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmucloaidonvi/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucLoaiDonVi = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucloaidonvi/get-details/${id}`);
    return res.data;
};
export const getDanhMucLoaiDonViByDanhMucLoaiDonViId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucloaidonvi/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucLoaiDonVi = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmucloaidonvi/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucLoaiDonVi = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmucloaidonvi/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucLoaiDonVi = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmucloaidonvi/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucloaidonvi/get-all-type`);
    return res.data;
};
