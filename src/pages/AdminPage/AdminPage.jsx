import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined, LockOutlined, AppstoreAddOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderCompoent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import HoSoDonVi from '../QuanLyDonVi/HoSoDonVi';
import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import * as PriorityByUserService from '../../services/PriorityByUserService';
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


import TabNghienCuu from '../QuanLyQuanNhan/CongTacGiangDay/TabNghienCuu';
import TabDaoTao from '../QuanLyQuanNhan/CongTacGiangDay/TabDaoTao';
// import QTKhenThuong from '../QuanLyQuanNhan/HoSoCanBo/QTKhenThuong';
// import QTKyLuat from '../QuanLyQuanNhan/HoSoCanBo/QTKyLuat';
import ThongTinCaNhan from '../QuanLyQuanNhan/CongTacGiangDay/ThongTinCaNhan';

import PhanQuyenNSD from '../Quyen_ChucNang/PhanQuyenNSD';
import TabQuyen from '../Quyen_ChucNang/TabQuyen';
import TaiChiTiet from '../QuanLyQuanNhan/CongTacGiangDay/TaiChiTiet';
import DMDonVi from '../QuanLyDonVi/DMDonVi';
import HoSoCanBo from '../QuanLyDonVi/HoSoCanBo';
import ChiTietQuanNhan from '../QuanLyDonVi/ChiTietQuanNhan/ChiTietQuanNhan';
import QuanLyNhuCauBC from '../QuanLyDonVi/QuanLyNhuCauBC';
import DieuChuyenCanBo from '../QuanLyDonVi/DieuChuyenCanBo';
import ThongKeTaiQuanNhan from '../ChiHuyDieuHanh/ThongKeTai/ThongKeTaiQuanNhan'

import TabThanhNhanTaiSan from '../QuanLyQuanNhan/HoSoCanBo/TabThanNhanTaiSan';
import ThongKeBaoCao from '../ChiHuyDieuHanh/ThongKeNhanLuc/ThongKeBaoCao';
import ThongKeTai from '../ChiHuyDieuHanh/ThongKeTai/ThongKeTai';
import HocVi from '../QuanLyDanhMuc/ToChucNhanSu/HocVi';
import TaiCaNhan from '../ChiHuyDieuHanh/ThongKeTai/TaiCaNhan';



const AdminPage = () => {
  const user = useSelector((state) => state?.user)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [statePriorityDetails, setstatePriority] = useState({});
  const [combinedData, setCombinedData] = useState([]);
  const userIsAdmin = user?.isAdmin === 'admin';
  const [data, setData] = useState([]);
  const fetchGetPriority = async () => {
    try {
      console.log('User _id:', user?.id);
      const resPriority = await PriorityByUserService.getPriorityByUser(user.id, user.access_token);
      const extractedData = resPriority.map(item => item.data); // Lấy ra giá trị từ thuộc tính data của mỗi đối tượng
      const combinedData = extractedData.flat();
      setCombinedData(combinedData);
      // setstatePriority({
      //   data: combinedData // Lưu mảng dữ liệu vào state
      // });


      setIsLoadingUpdate(false);
    } catch (error) {
      console.log('Error while fetching resPriority details:', error);
      setIsLoadingUpdate(false);
    }
  };
  useEffect(() => {
    setIsLoadingUpdate(true);
    fetchGetPriority();
  }, [user.id]);
  console.log('combinedData:', combinedData);
  const managementChildren = [
    getItem('Đổi mật khẩu', 'changepassword', <LockOutlined />),
    getItem('Tham số hệ thống', 'systemparams', <AppstoreAddOutlined />),
  ];
  const managementChildren2 = [];
  if (combinedData.includes("EVERYONE")) {
    managementChildren2.push(
      getItem('Quản lý phân quyền', 'quyen', <LockOutlined />),
    );
  }
  if (combinedData.includes("EVERYONE")) {
    managementChildren2.push(
      getItem('Phân quyền NSD', 'people', <AppstoreAddOutlined />)
    );
  }



  const items = [
    {
      label: 'Hệ thống',
      key: 'system',
      icon: <AppstoreOutlined />,
      children: [
        getItem('Đổi mật khẩu', 'changepassword', <LockOutlined />),
        getItem('Tham số hệ thống', 'systemparams', <AppstoreAddOutlined />),

      ],
    },


    {
      label: 'Quản lý Danh mục',
      key: 'quanlydanhmuc',
      icon: <AppstoreOutlined />,
      children: [
        {
          label: 'Tổ chức và nhân sự',
          key: 'tochucnhansu',
          icon: <SettingOutlined />,
          children: [
            getItem('Danh mục cấp bậc', 'capbac', <AppstoreAddOutlined />),
            getItem('Danh mục chức vụ', 'chucvu', <AppstoreAddOutlined />),
            getItem('Danh mục học hàm', 'hocham', <AppstoreAddOutlined />),
            getItem('Danh mục học vị', 'hocvi', <AppstoreAddOutlined />),
            getItem('Danh mục C.Danh CMKT', 'cdcmkt', <AppstoreAddOutlined />),
            getItem('Danh mục Loại đơn vị', 'loaidv', <AppstoreAddOutlined />),
            getItem('Danh mục Hình thức Khen thưởng', 'khenthuong', <AppstoreAddOutlined />),
            getItem('Danh mục Hình thức Kỷ luật', 'kyluat', <AppstoreAddOutlined />),
          ]
        },
        {
          label: 'Danh mục chung',
          key: 'chung',
          icon: <SettingOutlined />,
          children: [
            getItem('Danh mục Tỉnh', 'tinh', <AppstoreAddOutlined />),
            getItem('Danh mục Huyện', 'huyen', <AppstoreAddOutlined />),
            getItem('Danh mục Xã', 'xa', <AppstoreAddOutlined />),
            getItem('Danh mục Dân tộc', 'dantoc', <AppstoreAddOutlined />),
            getItem('Danh mục Tôn giáo', 'tongiao', <AppstoreAddOutlined />),
            getItem('Danh mục Khu vực ƯT', 'khuvucut', <AppstoreAddOutlined />),
            getItem('Danh mục Chế độ ƯT', 'chedout', <AppstoreAddOutlined />),
          ]
        },
      ],
    },
    {
      label: 'Danh mục cá nhân',
      key: 'quanlyquannhan',
      icon: <UserOutlined />,
      children: [
        {
          label: 'Thông tin cá nhân',
          key: 'hosocanbo',
          icon: <UserOutlined />,
          // children: [
          //   getItem('Thông tin cá nhân', 'hosocanbo', <AppstoreAddOutlined />),
          //   getItem('Chi tiết tải', 'khenthuong', <AppstoreAddOutlined />),
          //   getItem('Tải đào tạo', 'kyluat', <AppstoreAddOutlined />),
          //   getItem('Tải nghiên cứu', 'thannhantaisan', <AppstoreAddOutlined />),
          // ]
        },
        {
          label: 'Chi tiết tải',
          key: 'chitiettai',
          icon: <AppstoreAddOutlined />,
          // children: [
          //   getItem('Thông tin cá nhân', 'thongtincanhan', <AppstoreAddOutlined />),
          //   getItem('Chi tiết tải', 'chitiettai', <AppstoreAddOutlined />),
          //   getItem('Tải đào tạo', 'taidaotao', <AppstoreAddOutlined />),
          //   getItem('Tải nghiên cứu', 'tainghiencuu', <AppstoreAddOutlined />),


          // ]
        },
        {
          label: 'Tải đào tạo',
          key: 'taidaotao',
          icon: <AppstoreAddOutlined />,

        },
        {
          label: 'Tải nghiên cứu',
          key: 'tainghiencuu',
          icon: <AppstoreAddOutlined />,

        },
        {
          label: 'Tổng hợp tải',
          key: 'tonghoptai',
          icon: <AppstoreAddOutlined />,

        },
        // 
      ],
    },
    {
      label: 'Quản lý Đơn vị',
      key: 'donvis',
      icon: <AppstoreOutlined />,
      children: [
        getItem('Hồ sơ đơn vị', 'hsdv', <AppstoreAddOutlined />),
        getItem('Danh mục đơn vị', 'donvi', <LogoutOutlined />),
        getItem('Hồ sơ cán bộ', 'hscb', <LockOutlined />),
        //   getItem('Chi tiết hồ sơ cán bộ', 'cthscb', <LockOutlined />),
        // getItem('Quản lý nhu cầu/biên chế', 'quanlynhucaubc', <UserOutlined />),
        //  getItem('Điểu chuyển cán bộ', 'dieuchuyen', <UserOutlined />),
      ],
    },
    {

      label: 'Báo cáo thông kê',
      key: 'baocaothongke',
      icon: <LogoutOutlined />,
      children: [
        //    getItem('Thống kê nhân lực', 'thongkenhanluc', <UserOutlined />),
        getItem('Thông kê tải đơn vị', 'thongketai', <LockOutlined />),
        getItem('Thống kê tải cá nhân', 'thongketaiquannhan', <AppstoreAddOutlined />)


      ],
    },

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
    console.log("abcd");
    console.log("abcd" + user?.isAdmin);
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
      { queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60 },
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


      case 'capbac':
        return (
          <CapBac />
        )
      case 'chucvu':
        return (
          <ChucVu />
        )
      case 'hocham':
        return (
          <HocHam />
        )
      case 'hocvi':
        return (
          <HocVi />
        )
      case 'cdcmkt':
        return (
          <CDCMKT />
        )
      case 'loaidv':
        return (
          <LoaiDonVi />
        )
      case 'khenthuong':
        return (
          <KhenThuong />
        )
      case 'kyluat':
        return (
          <KyLuat />
        )



      // Danh mục chung

      case 'tinh':
        return (
          <Tinh />
        )

      case 'huyen':
        return (
          <Huyen />
        )

      case 'xa':
        return (
          <Xa />
        )

      case 'dantoc':
        return (
          <DanToc />
        )


      case 'tongiao':
        return (
          <TonGiao />
        )

      case 'khuvucut':
        return (
          <KhuVucUT />
        )


      case 'chedout':
        return (
          <CheDoUT />
        )


      //ThongTin Ca nhân
      // hồ sơ cán bộ
      case 'hosocanbo':
        return (
          <CapNhatHSCB />
        )

      case '/hosocanbo/:id':
        return (
          <ChiTietQuanNhan />
        )


      // case 'khenthuong':
      //   return (
      //     <QTKhenThuong />
      //   )
      // case 'kyluat':
      //   return (
      //     <QTKyLuat />
      //   )
      // case 'thannhantaisan':
      //   return (
      //     <TabThanhNhanTaiSan />
      //   )



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
      case 'tonghoptai':
        return (
          <TaiCaNhan />
        )

      //Quanly đơn vị
      case 'hsdv':
        return (
          <HoSoDonVi />
        )
      case 'donvi':
        return (
          <DMDonVi />
        )

      case 'hscb':
        return (
          <HoSoCanBo />
        )

      case 'cthscb':
        return (<ChiTietQuanNhan />)

      case 'quanlynhucaubc':
        return (
          <QuanLyNhuCauBC />
        )

      case 'dieuchuyen':
        return (
          <DieuChuyenCanBo />
        )


      // chỉ huy điều hành
      case 'thongkenhanluc':
        return (
          <ThongKeBaoCao />
          // <TKCapBac />
        )

      case 'thongketaiquannhan':
        return (
          <ThongKeTaiQuanNhan />
        )
      case 'thongketai':
        return (

          <ThongKeTai />
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
      <div style={{
        display: 'flex',
        // overflowX: 'hidden',

      }}>
        <Menu
          mode="inline"
          style={{
            width: 240,
            boxShadow: '1px 1px 2px #ccc',
            height: '1000vh',
            backgroundColor: '#222D32',
            // position: 'fixed',
            // top: 0,
            // left: 0,
            // bottom: 0,
          }}
          items={items}
          onClick={handleOnCLick}
          theme="dark"
          inlineIndent={10}
        />


        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          <div isLoading={memoCount && Object.keys(memoCount) && Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </div>
          {renderPage(keySelected)}
        </div>
      </div>





    </>
  )
}

export default AdminPage
