
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import * as QuanNhanService from '../../../services/QuanNhanService';

const NgoaiNgu = () => {
  const [data, setData] = useState([]);
  const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState({});
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user); 
  const fetchGetDetailsQuanNhan = async () => {
    try {
      console.log('User _id:', user.QuanNhanId);
      const resQuanNhan = await QuanNhanService.getQuanNhanByQuanNhanId(user.QuanNhanId, user.access_token);
      console.log('resQuanNhan:', resQuanNhan);
      if (resQuanNhan?.data) {
        const quanNhanId = resQuanNhan.data._id;
        console.log('tesst:', quanNhanId);
      // const res = await QuanNhanService.getDetailsQuanNhan(quanNhanId, user.access_token);
      if (resQuanNhan?.data) {
        setStateQuanNhanDetails({
          QuanNhanId: resQuanNhan?.data?.QuanNhanId,
          HoTen: resQuanNhan?.data?.HoTen,
          NgaySinh: resQuanNhan?.data?.NgaySinh,
          GioiTinh: resQuanNhan?.data?.GioiTinh,
          QueQuan: resQuanNhan?.data?.QueQuan,
          DiaChi: resQuanNhan?.data?.DiaChi,
          SoDienThoai: resQuanNhan?.data?.SoDienThoai,
          Email: resQuanNhan?.data?.Email,
          HoatDong: resQuanNhan?.data?.HoatDong,
          QuanHam: resQuanNhan?.data?.QuanHam,
          DonVi: resQuanNhan?.data?.DonVi,
          LoaiQN: resQuanNhan?.data?.LoaiQN,
        });
        setData([resQuanNhan.data]);
      }
      console.log('Dữ liệu từ API:', resQuanNhan);
      setIsLoadingUpdate(false);
    }} catch (error) {
      console.log('Error while fetching quan nhan details:', error);
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (user && user.QuanNhanId) {
      setIsLoadingUpdate(true);
      fetchGetDetailsQuanNhan();
    }
  }, [user]);
  const columns = [
    {
      title: 'QuanNhanId',
      dataIndex: 'QuanNhanId',
      key: 'QuanNhanId',
    },
    {
      title: 'HoTen',
      dataIndex: 'HoTen',
      key: 'HoTen',
    },
    {
      title: 'NgaySinh',
      dataIndex: 'NgaySinh',
      key: 'NgaySinh',
    },
    {
      title: 'GioiTinh',
      dataIndex: 'GioiTinh',
      key: 'GioiTinh',
    },
    {
      title: 'QueQuan',
      dataIndex: 'QueQuan',
      key: 'QueQuan',
    },
    {
      title: 'DiaChi',
      dataIndex: 'DiaChi',
      key: 'DiaChi',
    },
    {
      title: 'SoDienThoai',
      dataIndex: 'SoDienThoai',
      key: 'SoDienThoai',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'HoatDong',
      dataIndex: 'HoatDong',
      key: 'HoatDong',
    },
    {
      title: 'LoaiQN',
      dataIndex: 'LoaiQN',
      key: 'LoaiQN',
    },
  ];

  return (
    <Table dataSource={data} columns={columns} />
  );
};

export default NgoaiNgu;
