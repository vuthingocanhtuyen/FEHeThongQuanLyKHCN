import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucHocVi = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuchocvi/create`,
        data
    );
    return res.data;
};

export const updateDanhMucHocVi = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuchocvi/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucHocVi = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchocvi/get-details/${id}`);
    return res.data;
};
export const getDanhMucHocViByDanhMucHocViId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchocvi/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucHocVi = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuchocvi/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucHocVi = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuchocvi/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucHocVi = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuchocvi/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchocvi/get-all-type`);
    return res.data;
};
