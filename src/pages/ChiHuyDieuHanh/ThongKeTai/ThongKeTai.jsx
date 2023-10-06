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
            const taiData = await QuanNhanService.getTaiFromDonVi(currentUserDonVi)
            setIsLoading(false);
            setDataTK(taiData);
            console.log('e tk tai donvi: ', taiData);
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    useEffect(() => {

        setDataTableTK([
            {
                key: 1,
                stt: 1,
                QuanNhanId: dataTK.QuanNhanId,
                HoTen: dataTK.HoTen,
                TaiDaoTaoYeuCau: dataTK.TaiDaoTaoYeuCau,
                TaiThucDaoTaoYeuCau: dataTK.TaiThucDaoTaoYeuCau,

                KetQuaDaoTao: dataTK.KetQuaDaoTao,
                KetQuaNCKH: dataTK.KetQuaNCKH,

                TongTaiYeuCau: dataTK.TongTaiYeuCau,
                TongThucTai: dataTK.TongThucTai,
                KetQuaTongThuc: dataTK.KetQuaTongThuc

            }
        ]);
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
    const inittial = () => ({
        QuanNhanId: '',
        HoTen: '',
        NgaySinh: '',
        GioiTinh: '',
        QueQuan: '',
        DiaChi: '',
        SoDienThoai: '',
        Email: '',
        HoatDong: '',
        QuanHam: '',
        DonVi: '',
        LoaiQN: ''
    })
    const [stateQuanNhan, setStateQuanNhan] = useState(inittial())
    const [stateQuanNhanDetails, setStateQuanNhanDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId,
                HoTen,
                NgaySinh,
                GioiTinh,
                QueQuan,
                DiaChi,
                SoDienThoai,
                Email,
                HoatDong,
                QuanHam,
                DonVi,
                LoaiQN
            } = data
            const res = QuanNhanService.createQuanNhan({
                QuanNhanId,
                HoTen,
                NgaySinh,
                GioiTinh,
                QueQuan,
                DiaChi,
                SoDienThoai,
                Email,
                HoatDong,
                QuanHam,
                DonVi,
                LoaiQN
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = QuanNhanService.updateQuanNhan(
                id,
                token,
                { ...rests })
            return res
        },
    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = QuanNhanService.deleteQuanNhan(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QuanNhanService.deleteManyQuanNhan(
                ids,
                token)
            return res
        },
    )

    const getQuanNhanFromDonVi = async () => {
        const res = await QuanNhanService.getTaiFromDonVi(currentUserDonVi)
        console.log('e: ', res.data);
        return res
    }


    const fetchGetDetailsQuanNhan = async (rowSelected) => {
        const res = await QuanNhanService.getDetailsQuanNhan(rowSelected)
        if (res?.data) {
            setStateQuanNhanDetails({
                QuanNhanId: res?.data?.QuanNhanId,
                HoTen: res?.data?.HoTen,
                NgaySinh: res?.data?.NgaySinh,
                GioiTinh: res?.data?.GioiTinh,
                QueQuan: res?.data?.QueQuan,
                DiaChi: res?.data?.DiaChi,
                SoDienThoai: res?.data?.SoDienThoai,
                Email: res?.data?.Email,
                HoatDong: res?.data?.HoatDong,
                QuanHam: res?.data?.QuanHam,
                DonVi: res?.data?.DonVi,
                LoaiQN: res?.data?.LoaiQN
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuanNhanDetails);
            setCurrentUserDonViCode(currentUserDonVi);
            console.log("dong");
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuanNhanDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQuanNhan(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQuanNhan = () => {
        setIsOpenDrawer(true)
    }




    const fetchAllChucVu = async () => {
        const res = await ChucVuService.getChucVuFromDonVi(currentUserDonViCode)
        return res
    }
    const fetchAllChucVu2 = async () => {
        const res = await ChucVuService.getDataChucVuByDonVi(currentUserDonViCode)
        return res
    }
    const fetchAllQuanHam = async () => {
        const res = await QuanHamService.getAllType()
        return res
    }
    const fetchAllLoaiQuanNhan = async () => {
        const res = await LoaiQuanNhanService.getAllType()
        return res
    }
    const fetchAllDonVi = async () => {
        const res = await DonViService.getDonViConByTen(currentUserDonViCode)
        return res
    }
    const fetchAllDonVi2 = async () => {
        const res = await DonViService.getDonViConOnly(currentUserDonViCode)
        return res
    }


    // const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
    const typeQuanHam = useQuery({ queryKey: ['type-quanham'], queryFn: fetchAllQuanHam })
    const typeLoaiQuanNhan = useQuery({ queryKey: ['type-loaiquannhan'], queryFn: fetchAllLoaiQuanNhan })
    const allDonVi = useQuery({ queryKey: ['all-donvi'], queryFn: fetchAllDonVi })
    const allDonVi2 = useQuery({ queryKey: ['all-donvi2'], queryFn: fetchAllDonVi2 })
    const allChucVu = useQuery({ queryKey: ['all-chucvu'], queryFn: fetchAllChucVu })
    const allChucVu2 = useQuery({ queryKey: ['all-chucvu2'], queryFn: fetchAllChucVu2 })
    //  const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan

    const renderAction = () => {
        return (
            <div>
                {/* <Button style={{ fontSize: '15px' }} onClick={() => handleDetailsThongKeTai(record._id)} > Chi tiết</Button> */}
                &nbsp;
                <Button style={{ fontSize: '15px' }} onClick={handleDetailsQuanNhan} >Tải xuống</Button>
            </div>
        )
    }


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

    });


    const columns = [
        {
            title: 'Mã quân nhân',
            dataIndex: 'QuanNhanId',
            // sorter: (a, b) => a.QuanNhanId.length - b.QuanNhanId.length,
            // ...getColumnSearchProps('QuanNhanId')
        },
        {
            title: 'Họ và tên',
            dataIndex: 'HoTen',
            // sorter: (a, b) => a.HoTen.length - b.HoTen.length,
            // ...getColumnSearchProps('HoTen')
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


    useEffect(() => {
        if (currentUserDonViCode) {
            allDonVi.refetch();
        }
    }, [currentUserDonViCode, allDonVi]);
    useEffect(() => {
        if (currentUserDonViCode) {
            allChucVu.refetch();
        }
    }, [currentUserDonViCode, allChucVu]);
    useEffect(() => {
        if (currentUserDonViCode) {
            allDonVi2.refetch();
        }
    }, [currentUserDonViCode, allDonVi2]);
    useEffect(() => {
        if (currentUserDonViCode) {
            allChucVu2.refetch();
        }
    }, [currentUserDonViCode, allChucVu2]);



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
                <TableComponent columns={columns} isLoading={isLoading} dataTK={dataTableTK} onRow={(record, rowIndex) => {

                }} />
            </div>



        </div>
    )
}

export default ThongKeTai
