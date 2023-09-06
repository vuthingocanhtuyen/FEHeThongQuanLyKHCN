import axios from "axios"
import { axiosJWT } from "./UserService"
export const getChucVuFromDonVi = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/chucvudonvi/getchucvu/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };
  export const getDataChucVuByDonVi = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/chucvudonvi/getdatachucvu/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };