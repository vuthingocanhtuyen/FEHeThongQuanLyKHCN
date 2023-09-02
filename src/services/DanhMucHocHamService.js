import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucHocHam = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmuchocham/create`,
        data
    );
    return res.data;
};

export const updateDanhMucHocHam = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmuchocham/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucHocHam = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchocham/get-details/${id}`);
    return res.data;
};
export const getDanhMucHocHamByDanhMucHocHamId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchocham/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucHocHam = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmuchocham/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucHocHam = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmuchocham/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucHocHam = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmuchocham/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmuchocham/get-all-type`);
    return res.data;
};
