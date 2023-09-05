import axios from "axios";

export const axiosJWT = axios.create();

export const createDanhMucCheDoUT = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/danhmucchedout/create`,
        data
    );
    return res.data;
};

export const updateDanhMucCheDoUT = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/danhmucchedout/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsDanhMucCheDoUT = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchedout/get-details/${id}`);
    return res.data;
};
export const getDanhMucCheDoUTByDanhMucCheDoUTId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchedout/get-by-id/${id}`);
    return res.data;
};

export const deleteDanhMucCheDoUT = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/danhmucchedout/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllDanhMucCheDoUT = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/danhmucchedout/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDanhMucCheDoUT = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/danhmucchedout/delete-many`,
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/danhmucchedout/get-all-type`);
    return res.data;
};
