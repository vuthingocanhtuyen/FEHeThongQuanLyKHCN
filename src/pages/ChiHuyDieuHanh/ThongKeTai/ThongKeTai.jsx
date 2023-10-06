import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from '../style'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import TableComponent from '../../../components/TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../../utils'
// import * as QuanNhanService from '../../services/QuanNhanService'
import * as QuanNhanService from '../../../services/QuanNhanService'
import * as DonViService from '../../../services/DonViService'
import * as ChucVuService from '../../../services/ChucVuDonViService'
import * as QuanHamService from '../../../services/QuanHamService'
import * as LoaiQuanNhanService from '../../../services/LoaiQuanNhanService'
import * as PriorityByUserService from '../../../services/PriorityByUserService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import SearchBar from '../../QuanLyDonVi/Components/SearchBar';
import FreeDonVi from '../../../pages/QuanLyDonVi/DanhMucDonVi/FreeDonVi'
import { WrapperContentProfile, WrapperInput, WrapperLabel, WrapperContentProfileFree, WrapperContentProfileText } from '../../QuanLyDonVi/Components/style'
import { useNavigate } from 'react-router-dom'

import moment from 'moment';
const ThongKeTai = () => {
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [searchTermHoTen, setSearchTermHoTen] = useState('');
    const [searchTermQuanNhanId, setSearchTermQuanNhanId] = useState('');
    const [prevDonViCode, setPrevDonViCode] = useState(null);
    const navigate = useNavigate()

    const searchInput = useRef(null);
    const [treeNodeClickedId, setTreeNodeClickedId] = useState(null);
    const handleTreeNodeClick = (item) => {
        setTreeNodeClickedId(item);
        getDonViCode(item);
    }
    const [isLoading, setIsLoading] = useState(true);
    const [dataTK, setDataTK] = useState([]);
    const [dataTableTK, setDataTableTK] = useState([]);

    const fetchTaiData = async () => {
        try {
            setIsLoading(true);
            const taiData = await QuanNhanService.getTaiFromDonVi(currentUserDonVi); 
            setIsLoading(false);
            setDataTK(taiData.data);
            console.log(taiData.data);
            console.log(taiData.data[0]);
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    useEffect(() => {
        fetchTaiData();
    }, [currentUserDonVi]);

    useEffect(() => {
        const tableData = dataTK.map((item, index) => ({
            key: index + 1,
            QuanNhanId: item.QuanNhanId,
            HoTen: item.HoTen,
            TaiDaoTaoYeuCau: item.tongTai.TaiDaoTaoYeuCau,
            TaiThucDaoTaoYeuCau: item.tongTai.TaiThucDaoTaoYeuCau,
            KetQuaDaoTao: item.tongTai.KetQuaDaoTao,
            TaiNCKHYeuCau: item.tongTai.TaiNCKHYeuCau,
            TaiThucNCKHYeuCau: item.tongTai.TaiThucNCKHYeuCau,
            KetQuaNCKH: item.tongTai.KetQuaNCKH,
            TongTaiYeuCau: item.tongTai.TongTaiYeuCau,
            TongThucTai: item.tongTai.TongThucTai,
            KetQuaTongThuc: item.tongTai.KetQuaTongThuc
        }));
        console.log(tableData);
        setDataTableTK(tableData);
    }, [dataTK]);
    


    useEffect(() => {
        const fetchGetChucVuDonVi = async () => {

            try {
                // Gọi API để lấy thông tin đơn vị hiện tại của người dùng
                const response = await PriorityByUserService.getChucVuDonViFromUser(user.QuanNhanId, user.access_token);
                console.log(response.data);

                if (response.data && response.data.length > 0) {
                    const firstData = response.data[0];
                    console.log(response.data[0]);
                    const donViValue = firstData.DonVi[0];
                    setCurrentUserDonVi(donViValue);
                    setCurrentUserDonViCode(donViValue);
                }

            } catch (error) {
                console.error('Error fetching ChucVuDonVi:', error);
            }
        };

        fetchGetChucVuDonVi();
    }, [user.QuanNhanId, user.access_token]);
    const getDonViCode = async (item) => {
        console.log(item);
        if (item) {
            try {
                const res = await DonViService.getDetailsDonVi(item);
                console.log(res.data.code);
                setCurrentUserDonVi(res.data.code);
                return res
            }
            catch { }
        }
    }
    const handleSearchHoTen = (searchText) => {
        setSearchTermHoTen(searchText);
    };

    const handleSearchQuanNhanId = (searchText) => {
        setSearchTermQuanNhanId(searchText);
    };




    const columns = [
        {
            title: 'Mã quân nhân',
            dataIndex: 'QuanNhanId',

        },
        {
            title: 'Họ và tên',
            dataIndex: 'HoTen',
        
        },
        {
            title: 'Tải đào tạo',
            children: [
                {
                    title: 'Thực tải',
                    dataIndex: 'TaiThucDaoTaoYeuCau',
                },
                {
                    title: 'Tải yêu cầu',
                    dataIndex: 'TaiDaoTaoYeuCau',
                },
                {
                    title: '% Đào tạo',
                    dataIndex: 'KetQuaDaoTao',
                },

            ]

        },
        {
            title: 'Tải nghiên cứu khoa học',
            children: [
                {
                    title: 'Thực tải',
                    dataIndex: 'TaiThucNCKHYeuCau',
                },
                {
                    title: 'Tải yêu cầu',
                    dataIndex: 'TaiNCKHYeuCau',
                },
                {
                    title: '% NCKH',
                    dataIndex: 'KetQuaNCKH',
                },

            ]

        },
        {
            title: 'Tổng tải',
            children: [
                {
                    title: 'Thực tải',
                    dataIndex: 'TongThucTai',
                },
                {
                    title: 'Tải yêu cầu',
                    dataIndex: 'TongTaiYeuCau',
                },
                {
                    title: '% Tổng',
                    dataIndex: 'KetQuaTongThuc',
                },

            ]

        },


    ];
    return (
        <div>
            <WrapperHeader>Quản lý quân nhân</WrapperHeader>
            {/* <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '50px', width: '50px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '20px' }} /></Button>
            </div> */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', marginTop: '15px' }}>
                <div style={{ margin: '0 auto', float: 'left', padding: '5px' }}>
                    <FreeDonVi handleTreeNodeClick={handleTreeNodeClick} treeNodeClickedId={treeNodeClickedId} />
                </div>
                <div style={{ margin: '0 auto', height: '115px', float: 'left' }}>

                    <WrapperContentProfile>
                        <Form.Item
                            label="Mã quân nhân: "
                            name="QuanNhanId"
                        >
                            <SearchBar onSearch={handleSearchQuanNhanId} />
                        </Form.Item>
                    </WrapperContentProfile>
                </div>
                <div style={{ margin: '0 auto', height: '115px', float: 'left' }}>
                    <WrapperContentProfile>
                        <Form.Item
                            label="Họ tên: "
                            name="HoTen"
                        >
                            <SearchBar onSearch={handleSearchHoTen} />
                        </Form.Item>
                    </WrapperContentProfile>
                </div>

                {/* <Button type="primary" htmlType="submit" style={{ marginTop: '40px', marginLeft: '10px' }} >
                    Lấy dữ liệu
                </Button> */}
            </div>

            <div style={{ clear: 'both' }}></div>
            <br />
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoading} data={dataTableTK} onRow={(record, rowIndex) => {

                }} />
            </div>



        </div>
    )
}

export default ThongKeTai
