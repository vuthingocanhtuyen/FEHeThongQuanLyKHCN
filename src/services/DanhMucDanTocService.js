import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucDanToc = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmucdantoc/create`,
        data
    );
    return res.data;
};

export const updateDanhMucDanToc = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmucdantoc/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucDanToc = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucdantoc/get-details/${id}`);
    return res.data;
};
export const getDanhMucDanTocByDanhMucDanTocId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucdantoc/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucDanToc = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmucdantoc/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucDanToc = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmucdantoc/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucDanToc = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmucdantoc/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucdantoc/get-all-type`);
    return res.data;
};
