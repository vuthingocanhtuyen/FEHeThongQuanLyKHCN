
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import * as QuaTrinhCongTacService from '../../../services/QuaTrinhCongTacService';

const QTCongTac = () => {
  const [data, setData] = useState([]);
  const [stateQuaTrinhCongTacDetails, setStateQuaTrinhCongTac] = useState({});
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const user = useSelector((state) => state?.user); 
  const fetchGetDetailsQuaTrinhCongTac = async () => {
    try {
      console.log('User _id:', user.QuanNhanId);
      const resQuaTrinhCongTac = await QuaTrinhCongTacService.getQuaTrinhCongTacByQuanNhanId(user.QuanNhanId, user.access_token);
      console.log('resQuaTrinhCongTac:', resQuaTrinhCongTac);
      if (resQuaTrinhCongTac?.data) {
        const quanNhanId = resQuaTrinhCongTac.data._id;
        console.log('tesst:', resQuaTrinhCongTac?.data);
      if (resQuaTrinhCongTac?.data) {
        setStateQuaTrinhCongTac({
          QuaTrinhCongTacId: resQuaTrinhCongTac?.data[0]?.QuaTrinhCongTacId,
          QuanNhanId: resQuaTrinhCongTac?.data[0]?.QuanNhanId,
          SoQuyetDinh: resQuaTrinhCongTac?.data[0]?.SoQuyetDinh,
          NgayQuyetDinh: resQuaTrinhCongTac?.data[0]?.NgayQuyetDinh,
          ChucVu: resQuaTrinhCongTac?.data[0]?.ChucVu,
          DonVi: resQuaTrinhCongTac?.data[0]?.DonVi,
          KetThuc: resQuaTrinhCongTac?.data[0]?.KetThuc,
          DonViSinhHoatHocThuat: resQuaTrinhCongTac?.data[0]?.DonViSinhHoatHocThuat,
          TrangThai: resQuaTrinhCongTac?.data[0]?.TrangThai,
          edituser: resQuaTrinhCongTac?.data[0]?.edituser,
          edittime: resQuaTrinhCongTac?.data[0]?.edittime,
          GhiChu: resQuaTrinhCongTac?.data[0]?.GhiChu,
        });
        setData(resQuaTrinhCongTac.data);
      }
      console.log('Updated data:', data); 
      console.log('Dữ liệu từ API:', resQuaTrinhCongTac);
      setIsLoadingUpdate(false);
    }} catch (error) {
      console.log('Error while fetching quan nhan details:', error);
      setIsLoadingUpdate(false);
    }
  };
  useEffect(() => {
    console.log('Current data:', data);
  }, [data]);
  useEffect(() => {
    if (user && user.QuanNhanId) {
      setIsLoadingUpdate(true);
      fetchGetDetailsQuaTrinhCongTac();
    }
  }, [user]);
  const columns = [
    {
      title: 'QuanNhanId',
      dataIndex: 'QuanNhanId',
      key: 'QuanNhanId',
    },
    {
      title: 'SoQuyetDinh',
      dataIndex: 'SoQuyetDinh',
      key: 'SoQuyetDinh',
    },
    {
      title: 'NgayQuyetDinh',
      dataIndex: 'NgayQuyetDinh',
      key: 'NgayQuyetDinh',
    },
    {
      title: 'ChucVu',
      dataIndex: 'ChucVu',
      key: 'ChucVu',
    },
    {
      title: 'DonVi',
      dataIndex: 'DonVi',
      key: 'DonVi',
    },
    {
      title: 'KetThuc',
      dataIndex: 'KetThuc',
      key: 'KetThuc',
    },
    {
      title: 'DonViSinhHoatHocThuat',
      dataIndex: 'DonViSinhHoatHocThuat',
      key: 'DonViSinhHoatHocThuat',
    },
    {
      title: 'TrangThai',
      dataIndex: 'TrangThai',
      key: 'TrangThai',
    },
    {
      title: 'GhiChu',
      dataIndex: 'GhiChu',
      key: 'GhiChu',
    },
  ];

  return (
    <div>
      {isLoading ? ( // Hiển thị thông báo đang tải
        <div>Loading...</div>
      ) : (
        <Table dataSource={data} columns={columns} />
      )}
    </div>
  );
};

export default QTCongTac;