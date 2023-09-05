import axios from "axios"
import { axiosJWT } from "./UserService"
export const getAllType = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/loaiquannhan/get-all-type`);
    return res.data;
};