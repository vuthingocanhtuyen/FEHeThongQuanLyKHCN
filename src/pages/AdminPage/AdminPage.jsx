import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, SettingOutlined, LogoutOutlined, LockOutlined, AppstoreAddOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderCompoent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAmin';
import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'

import CustomizedContent from './components/CustomizedContent';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import Loading from '../../components/LoadingComponent/Loading';

import DoiMatKhau from '../DoiMatKhau/DoiMatKhau';
import Param from '../../pages/ThamSoHeThong/Param';

import CapBac from '../QuanLyDanhMuc/ToChucNhanSu/CapBac';
import KhenThuong from '../QuanLyDanhMuc/ToChucNhanSu/KhenThuong';
import KyLuat from '../QuanLyDanhMuc/ToChucNhanSu/KyLuat';
import ChucVu from '../QuanLyDanhMuc/ToChucNhanSu/ChucVu';
import LoaiDonVi from '../QuanLyDanhMuc/ToChucNhanSu/LoaiDonVi';
import CDCMKT from '../QuanLyDanhMuc/ToChucNhanSu/CDCMKT';
import HocHam from '../QuanLyDanhMuc/ToChucNhanSu/HocHam';

import Tinh from '../QuanLyDanhMuc/DanhMucChung/Tinh'
import Huyen from '../QuanLyDanhMuc/DanhMucChung/Huyen'
import Xa from '../QuanLyDanhMuc/DanhMucChung/Xa'
import DanToc from '../QuanLyDanhMuc/DanhMucChung/DanToc'
import TonGiao from '../QuanLyDanhMuc/DanhMucChung/TonGiao'
import KhuVucUT from '../QuanLyDanhMuc/DanhMucChung/KhuVucUT'
import CheDoUT from '../QuanLyDanhMuc/DanhMucChung/CheDoUT'
import CapNhatHSCB from '../QuanLyQuanNhan/HoSoCanBo/CapNhatHSCB';






import Free from '../../components/Free/Free'
import TabNghienCuu from '../QuanLyQuanNhan/CongTacGiangDay/TabNghienCuu';
import TabDaoTao from '../QuanLyQuanNhan/CongTacGiangDay/TabDaoTao';
import QTKhenThuong from '../QuanLyQuanNhan/HoSoCanBo/QTKhenThuong';
import QTKyLuat from '../QuanLyQuanNhan/HoSoCanBo/QTKyLuat';
import ThongTinCaNhan from '../QuanLyQuanNhan/CongTacGiangDay/ThongTinCaNhan';

import PhanQuyenNSD from '../Quyen_ChucNang/PhanQuyenNSD';
import TabQuyen from '../Quyen_ChucNang/TabQuyen';
import TaiChiTiet from '../QuanLyQuanNhan/CongTacGiangDay/TaiChiTiet';
import DMDonVi from '../QuanLyDonVi/DMDonVi';
import HoSoCanBo from '../QuanLyDonVi/HoSoCanBo';
import QuanLyNhuCauBC from '../QuanLyDonVi/QuanLyNhuCauBC';
import DieuChuyenCanBo from '../QuanLyDonVi/DieuChuyenCanBo';

import TKBienChe from '../ChiHuyDieuHanh/TKBienChe';
import TKCapBac from '../ChiHuyDieuHanh/TKCapBac';
import TKCDKH from '../ChiHuyDieuHanh/TKCDKH';
import TKDoTuoi from '../ChiHuyDieuHanh/TKDoTuoi';
import TKNganh from '../ChiHuyDieuHanh/TKNganh';


const AdminPage = () => {
  const user = useSelector((state) => state?.user)
  const userIsAdmin = user?.isAdmin === 'admin';
  const managementChildren = [
    getItem('Đổi mật khẩu', 'changepassword', <LockOutlined />),
    getItem('Người dùng', 'users2', <UserOutlined />)
  ];
  if (userIsAdmin) {
    managementChildren.push(
      getItem('Tham số hệ thống', 'systemparams', <AppstoreAddOutlined />),
      getItem('Nhóm quyền', 'quyen', <LockOutlined />),
      getItem('Nhóm chức năng', 'module', <AppstoreAddOutlined />),
      getItem('Nhóm người dùng', 'people', <LockOutlined />)
    );
  }
  const items = [
    {
      label: 'Hệ thống',
      key: 'system',
      icon: <AppstoreOutlined />,
      children: [
        {
          label: 'Hệ thống',
          key: 'id',
          icon: <SettingOutlined />,
          children: [
            getItem('Đổi mật khẩu', 'changepassword', <LockOutlined />),
            getItem('Tham số hệ thống', 'systemparams', <AppstoreAddOutlined />),
          ]
        },
        {
          label: 'Quản lý NSD và Quyền',
          key: 'management',
          icon: <UserOutlined />,
          children: [
            getItem('Quản lý phân quyền', 'quyen', <LockOutlined />),
            getItem('Phân quyền NSD', 'people', <AppstoreAddOutlined />),
          ]
        },

      ],
    },

    // getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    // getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
    {
      label: 'Quản lý Danh mục',
      key: '0',
      icon: <AppstoreOutlined />,
      children: [
        {
          label: 'Tổ chức và nhân sự',
          key: '7',
          icon: <SettingOutlined />,
          children: [
            getItem('Danh mục cấp bậc', '1', <AppstoreAddOutlined />),
            getItem('Danh mục chức vụ', '2', <AppstoreAddOutlined />),
            getItem('Danh mục học hàm', '3', <AppstoreAddOutlined />),
            getItem('Danh mục C.Danh CMKT', '4', <AppstoreAddOutlined />),
            getItem('Danh mục Loại đơn vị', '5', <AppstoreAddOutlined />),
            getItem('Danh mục Hình thức Khen thưởng', '6', <AppstoreAddOutlined />),
            getItem('Danh mục Hình thức Kỷ luật', '8', <AppstoreAddOutlined />),
          ]
        },
        {
          label: 'Danh mục chung',
          key: '9',
          icon: <SettingOutlined />,
          children: [
            getItem('Danh mục Tỉnh', '10', <AppstoreAddOutlined />),
            getItem('Danh mục Huyện', '11', <AppstoreAddOutlined />),
            getItem('Danh mục Xã', '12', <AppstoreAddOutlined />),
            getItem('Danh mục Dân tộc', '13', <AppstoreAddOutlined />),
            getItem('Danh mục Tôn giáo', '14', <AppstoreAddOutlined />),
            getItem('Danh mục Khu vực ƯT', '15', <AppstoreAddOutlined />),
            getItem('Danh mục Chế độ ƯT', '16', <AppstoreAddOutlined />),
          ]
        },
      ],
    },
    {
      label: 'Danh mục cá nhân',
      key: 'quanlyquannhan',
      icon: <AppstoreOutlined />,
      children: [
        {
          label: 'Hồ sơ Cán bộ',
          key: 'hosocanbo',
          icon: <SettingOutlined />,
          children: [
            getItem('Cập nhật hồ sơ cán bộ', 'hosocanbo', <AppstoreAddOutlined />),
            // getItem('In danh sách cán bộ', 'quannhans', <AppstoreAddOutlined />),
            // getItem('Cập nhật Hồ sơ cán bộ theo đơn vị', 'capnhathscb', <AppstoreAddOutlined />),
            // getItem('Quá trình công tác', 'congtac', <AppstoreAddOutlined />),
            // getItem('Quá trình cấp bậc', 'capbac', <AppstoreAddOutlined />),
            // getItem('Quá trình đào tạo', 'daotao', <AppstoreAddOutlined />),
            getItem('Quá trình khen thưởng', 'khenthuong', <AppstoreAddOutlined />),
            getItem('Quá trình kỷ luật', 'kyluat', <AppstoreAddOutlined />),
            //  getItem('Tìm kiếm', 'timkiem', <AppstoreAddOutlined />),
          ]
        },
        {
          label: 'Công tác giảng dạy',
          key: 'congtacgiangday',
          icon: <SettingOutlined />,
          children: [
            getItem('Thông tin cá nhân', 'thongtincanhan', <AppstoreAddOutlined />),
            getItem('Chi tiết tải', 'chitiettai', <AppstoreAddOutlined />),
            getItem('Tải đào tạo', 'taidaotao', <AppstoreAddOutlined />),
            getItem('Tải nghiên cứu', 'tainghiencuu', <AppstoreAddOutlined />),


          ]
        },
        // 
      ],
    },
    {
      label: 'Quản lý Đơn vị',
      key: 'donvis',
      icon: <AppstoreOutlined />,
      children: [
        getItem('Danh mục đơn vị', 'donvi', <LogoutOutlined />),
        getItem('Hồ sơ cán bộ', 'hscb', <LockOutlined />),
        getItem('Quản lý nhu cầu/biên chế', 'quanlynhucaubc', <UserOutlined />),
        getItem('Điểu chuyển cán bộ', 'dieuchuyen', <UserOutlined />),
      ],
    },
    {
      label: 'Chỉ huy/ Điều hành',
      key: 'chihuydieuhanh',
      icon: <AppstoreOutlined />,
      children: [
        getItem('Báo cáo biên chế', 'slbc', <LogoutOutlined />),
        getItem('Báo cáo cấp bậc', 'slcb', <LockOutlined />),
        getItem('Báo cáo CD-KH', 'slcdkh', <AppstoreAddOutlined />),
        getItem('Báo cáo độ tuổi', 'sldotuoi', <UserOutlined />),
        getItem('Báo cáo ngành', 'slnganh', <UserOutlined />),
      ],
    },
    // {
    //   label: 'Quản lý nghiệp vụ',
    //   key: 'quanlynghiepvu',
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     getItem('Quản lý giảng dạy nghiên cứu', 'giangday', <AppstoreAddOutlined />)
    //   ],
    // },
  ];

  const [keySelected, setKeySelected] = useState('');
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return { data: res?.data, key: 'orders' }
  }


  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res1', res)
    return { data: res?.data, key: 'products' }
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return { data: res?.data, key: 'users' }
  }
  const getAllQuanNhan = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return { data: res?.data, key: 'quannhans' }
  }

  const queries = useQueries({
    queries: [
      { queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60 },
      { queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60 },
      { queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60 },
      // {queryKey: ['quannhans'], queryFn: getAllQuanNhan, staleTime: 1000 * 60},
    ]
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if (queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
      return result
    } catch (error) {
      return result
    }
  }, [queries])
  const COLORS = {
    users: ['#e66465', '#9198e5'],
    products: ['#a8c0ff', '#3f2b96'],
    orders: ['#11998e', '#38ef7d'],
    //  quannhans: ['#11998e', '#38ef7d'],
  };

  const renderPage = (key) => {
    switch (key) {
      // Hệ thống

      case 'changepassword':
        return (
          <DoiMatKhau />
        )

      case 'systemparams':
        return (
          <Param />
        )

      //quan ly nsd và quyền
      case 'quyen':
        return (
          <TabQuyen />
        )
      case 'people':
        return (
          <PhanQuyenNSD />
        )

      case 'users':
        return (
          <AdminUser />
        )
      //Danh mục quản lý


      case '1':
        return (
          <CapBac />
        )
      case '2':
        return (
          <ChucVu />
        )
      case '3':
        return (
          <HocHam />
        )
      case '4':
        return (
          <CDCMKT />
        )
      case '5':
        return (
          <LoaiDonVi />
        )
      case '6':
        return (
          <KhenThuong />
        )
      case '8':
        return (
          <KyLuat />
        )



      // Danh mục chung

      case '10':
        return (
          <Tinh />
        )

      case '11':
        return (
          <Huyen />
        )

      case '12':
        return (
          <Xa />
        )

      case '13':
        return (
          <DanToc />
        )


      case '14':
        return (
          <TonGiao />
        )

      case '15':
        return (
          <KhuVucUT />
        )


      case '16':
        return (
          <CheDoUT />
        )


      //ThongTin Ca nhân
      // hồ sơ cán bộ
      case 'hosocanbo':
        return (
          <CapNhatHSCB />
        )

      case 'khenthuong':
        return (
          <QTKhenThuong />
        )
      case 'kyluat':
        return (
          <QTKyLuat />
        )



      // công tác giảng dạy

      case 'thongtincanhan':
        return (
          <ThongTinCaNhan />
        )
      case 'chitiettai':
        return (
          <TaiChiTiet />
        )
      case 'taidaotao':
        return (
          <TabDaoTao />
        )
      case 'tainghiencuu':
        return (
          <TabNghienCuu />
        )


      //Quanly đơn vị

      case 'donvi':
        return (
          <DMDonVi />
        )

      case 'hscb':
        return (
          <HoSoCanBo />
        )
      case 'quanlynhucaubc':
        return (
          <QuanLyNhuCauBC />
        )

      case 'dieuchuyen':
        return (
          <DieuChuyenCanBo />
        )


      // chỉ huy điều hành
      case 'slbc':
        return (
          <TKBienChe />
        )


      case 'slcb':
        return (

          <TKCapBac />
        )
      case 'slcdkh':
        return (
          <TKCDKH />
        )
      case 'sldotuoi':
        return (
          <TKDoTuoi />
        )

      case 'slnganh':
        return (
          <TKNganh />
        )









      case 'products':
        return (
          <AdminProduct />
        )
      case 'orders':
        return (
          <OrderAdmin />
        )
      case 'quannhans':
        return (
          <AdminUser />
        )
      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  console.log('memoCount', memoCount)
  return (
    <>



      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex', overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: 240,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
            backgroundColor: '#222D32'
          }}
          items={items}
          onClick={handleOnCLick}
          theme="dark"
          inlineIndent={10}
        />


        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          <Loading isLoading={memoCount && Object.keys(memoCount) && Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </Loading>
          {renderPage(keySelected)}
        </div>
      </div>





    </>
  )
}

export default AdminPage
