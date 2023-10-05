
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import CheckboxComponent from '../../../../components/CheckBox/CheckBox'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as HopDongService from '../../../../services/HopDongService';
import * as HinhThucHuongdanService from '../../../../services/HinhThucHuongDanService';
import * as PriorityByUserService from '../../../../services/PriorityByUserService'
import * as QuanNhanService from '../../../../services/QuanNhanService'
import * as HTCVService from '../../../../services/HTCVHopDongService';
import * as VaiTroService from '../../../../services/VaiTroService';
import { WrapperHeader, WrapperUploadFile } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'
import moment from 'moment';
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const HopDong = ({ quannhanId }) => {
    const [currentUserDonVi, setCurrentUserDonVi] = useState(null);
    const [currentUserDonViCode, setCurrentUserDonViCode] = useState(null);
    const [htcvId, sethtcvId] = useState('')
    const [hopdongId, sethopdongId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [rowSelected2, setRowSelected2] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isOpenDrawer2, setIsOpenDrawer2] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenDelete2, setIsModalOpenDelete2] = useState(false)

    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)
    const [NgayDKKT, setNgayDKKT] = useState('');
    const [NgayBD, setNgayBD] = useState('');
    const [NgayThu, setNgayThu] = useState('');

    const [selectedName, setSelectedName] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    //  const quannhanId = user.QuanNhanId;

    useEffect(() => {
        const fetchGetChucVuDonVi = async () => {

            try {
                // Gọi API để lấy thông tin đơn vị hiện tại của người dùng
                const response = await PriorityByUserService.getChucVuDonViFromUser(user.QuanNhanId, user.access_token);


                if (response.data && response.data.length > 0) {
                    const firstData = response.data[0];

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
    const inittial = () => ({
        HopDongId: '',
        TenHopDong: '',
        BenA: '',
        DonViChuTri: '',
        GiaTriHopDong: '',
        ThoiDiemKetThuc: moment(),
        ThoiDiemBatDau: moment(),
        NguoiChuTri: '',
        SoThanhVien: '',
        CacThanhVien: '',
        NgayThanhLy: moment(),
        Tai: '',
        FileCM: '',
        TrangThai: '',
        CacHTCV: '',
        GhiChu: '',
    })
    const inittialHTCV = () => ({
        HinhThucCV: '',
        QuanNhanId: '',
        HoTen: '',

        DonVi: '',
        VaiTro: '',
        SoGioQuyDoi: '',
        GhiChu: '',
    })
    const [stateHopDong, setStateHopDong] = useState(inittial())
    const [stateHopDongDetails, setStateHopDongDetails] = useState(inittial())
    const [stateHTCVDetails, setStateHTCVDetails] = useState(inittialHTCV())
    const [stateHTCV, setStateHTCV] = useState(inittialHTCV())
    const [form] = Form.useForm();

    const mutation = useMutationHooks(

        (data) => {
            const { QuanNhanId = quannhanId, HopDongId, TenHopDong, BenA, DonViChuTri, GiaTriHopDong, ThoiDiemKetThuc, ThoiDiemBatDau, NguoiChuTri, SoThanhVien, CacThanhVien, NgayThanhLy, Tai, FileCM, TrangThai = 0, edituser, edittime, GhiChu } = data
            const res = HopDongService.createHopDong({
                HopDongId, QuanNhanId, TenHopDong, BenA, DonViChuTri, GiaTriHopDong, ThoiDiemKetThuc, ThoiDiemBatDau, NguoiChuTri, SoThanhVien, CacThanhVien, NgayThanhLy, Tai, FileCM, TrangThai, edituser, edittime, GhiChu
            }).then(res => {
                try {
                    sethopdongId(res.data._id);
                    return res;
                } catch { };
            });
        }
    )
    const mutation2 = useMutationHooks(

        (data) => {
            try {
                const { HinhThucCV, QuanNhanId, HoTen, DonVi, VaiTro, SoGioQuyDoi, GhiChu } = data
                const res = HTCVService.createHTCV({
                    HinhThucCV, QuanNhanId, HoTen, DonVi, VaiTro, SoGioQuyDoi, GhiChu
                }).then(res => {
                    sethtcvId(res.data._id);
                    return res;
                });
            }
            catch { }
        }
    )


    const mutationUpdate = useMutationHooks(
        (data) => {

            const { id,
                token,
                ...rests } = data
            const res = HopDongService.updateHopDong(
                id,
                token,
                { ...rests })
            return res
        },

    )

    const mutationUpdateTrangThai = useMutationHooks(
        (data) => {
            console.log("data update:", data);
            const { id, token, ...rests } = data;
            const updatedData = { ...rests, TrangThai: 1 }; // Update the TrangThai attribute to 1
            const res = HopDongService.updateHopDong(id, token, updatedData);
            return res;

        },

    )
    // ngày dự kiến kết thúc
    useEffect(() => {
        setNgayDKKT(moment(stateHopDongDetails['ThoiDiemKetThuc']));
        // setNgayQD(convertDateToString(stateHopDongDetails['NgayQuyetDinh']));
    }, [form, stateHopDongDetails, isOpenDrawer])

    const handleOnchangeDetailNgayDKKT = (date) => {
        setStateHopDongDetails({
            ...stateHopDongDetails,
            ThoiDiemKetThuc: date
        })
    }
    const handleOnchangeNgayDKKT = (date) => {
        setStateHopDong({
            ...stateHopDong,
            ThoiDiemKetThuc: date
        })
    }
    // ngày bắt đầu
    useEffect(() => {
        setNgayBD(moment(stateHopDongDetails['ThoiDiemBatDau']));
        // setNgayQD(convertDateToString(stateHopDongDetails['NgayQuyetDinh']));
    }, [form, stateHopDongDetails, isOpenDrawer])

    const handleOnchangeDetailNgayBD = (date) => {
        setStateHopDongDetails({
            ...stateHopDongDetails,
            ThoiDiemBatDau: date
        })
    }
    const handleOnchangeNgayBD = (date) => {
        setStateHopDong({
            ...stateHopDong,
            ThoiDiemBatDau: date
        })
    }


    // ngày nghiệm thu
    useEffect(() => {
        setNgayThu(moment(stateHopDongDetails['NgayThanhLy']));
        // setNgayQD(convertDateToString(stateHopDongDetails['NgayQuyetDinh']));
    }, [form, stateHopDongDetails, isOpenDrawer])

    const handleOnchangeDetailNgayThu = (date) => {
        setStateHopDongDetails({
            ...stateHopDongDetails,
            NgayThanhLy: date
        })
    }
    const handleOnchangeNgayThu = (date) => {
        setStateHopDong({
            ...stateHopDong,
            NgayThanhLy: date
        })
    }


    const handleCancelPheDuyet = () => {
        setIsModalOpenPheDuyet(false)
    }
    const handleCancelNhapLai = () => {
        setIsModalOpenNhapLai(false)
    }

    const mutationUpdateNhapLai = useMutationHooks(
        (data) => {
            console.log("data update:", data);
            const { id, token, ...rests } = data;
            const updatedData = { ...rests, TrangThai: 2 }; // Update the TrangThai attribute to 1
            const res = HopDongService.updateHopDong(id, token, updatedData);
            return res;

        },

    )
    const mutationUpdate2 = useMutationHooks(
        (data) => {

            const { id,
                token,
                ...rests } = data
            const res = HTCVService.updateHTCV(
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
            const res = HopDongService.deleteHopDong(
                id,
                token)
            return res
        },
    )
    const mutationDeleted2 = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = HTCVService.deleteHTCV(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = HopDongService.deleteManyHopDong(
                ids,
                token)
            return res
        },
    )


    const getAllHopDongs = async () => {
        const res = await HopDongService.getAllHopDong()
        return res
    }

    // show


    const fetchGetHopDong = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]

        if (quannhanId) {

            const res = await HopDongService.getHopDongByQuanNhanId(quannhanId)

            if (res?.data) {
                setStateHopDongDetails({
                    HopDongId: res?.data.HopDongId,
                    TenHopDong: res?.data.TenHopDong,
                    BenA: res?.data.BenA,
                    DonViChuTri: res?.data.DonViChuTri,
                    GiaTriHopDong: res?.data.GiaTriHopDong,
                    ThoiDiemKetThuc: res?.data.ThoiDiemKetThuc,
                    ThoiDiemBatDau: res?.data.ThoiDiemBatDau,
                    NguoiChuTri: res?.data.NguoiChuTri,
                    SoThanhVien: res?.data.SoThanhVien,
                    CacThanhVien: res?.data.CacThanhVien,
                    NgayThanhLy: res?.data.NgayThanhLy,
                    Tai: res?.data.Tai,
                    FileCM: res?.data.FileCM,
                    TrangThai: res?.data.TrangThai,
                    CacHTCV: res?.data.CacHTCV,
                    GhiChu: res?.data.GhiChu,


                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateHopDongDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    const fetchGetHTCV = async () => {

        if (hopdongId) {
            const res = await HopDongService.getDetailsHopDong(hopdongId)


            // if (res?.data) {
            //     setStateHTCVDetails({
            //         // HinhThucCV: res?.data?.CacHTCV[0].HinhThucCV,
            //         // QuanNhanId: res?.data?.CacHTCV[0].QuanNhanId,
            //         // HoTen: res?.data?.CacHTCV[0].HoTen,
            //         // KhoiLuongCV: res?.data?.CacHTCV[0].KhoiLuongCV,
            //         // DonVi: res?.data?.CacHTCV[0].DonVi,
            //         // SoTiet: res?.data?.CacHTCV[0].SoTiet,
            //         // SoGioQuyDoi: res?.data?.CacHTCV[0].SoGioQuyDoi,
            //         // GhiChu: res?.data?.CacHTCV[0].GhiChu,
            //     })
            // }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateHopDongDetails)

            return res.data.CacHTCV
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateHopDongDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateHopDongDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            sethopdongId(rowSelected);
            fetchGetDetailsHopDong(rowSelected);

        }
    }, [rowSelected, isOpenDrawer])
    useEffect(() => {
        if (rowSelected2 && isOpenDrawer2) {
            setIsLoadingUpdate(true);
            fetchGetDetailsHTCV(rowSelected2);
        }
    }, [rowSelected2, isOpenDrawer2])



    const handleDetailsHopDong = () => {
        setIsOpenDrawer(true)
    }
    const handleDetailsHTCV = () => {
        setIsOpenDrawer2(true)
    }


    const handleDelteManyHopDongs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                hopdongDetails.refetch()
            }
        })
    }
    const getQuanNhanFromDonVi = async () => {
        const res = await QuanNhanService.getQuanNhanFromDonVi(currentUserDonVi)
        return res
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataUpdated2, isLoading: isLoadingUpdated2, isSuccess: isSuccessUpdated2, isError: isErrorUpdated2 } = mutationUpdate2
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeleted2, isLoading: isLoadingDeleted2, isSuccess: isSuccessDelected2, isError: isErrorDeleted2 } = mutationDeleted2
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai



    const queryHopDong = useQuery({ queryKey: ['hopdong'], queryFn: getAllHopDongs })
    const hopdongDetails = useQuery(['hosoquannhanhopdong', quannhanId], fetchGetHopDong, { enabled: !!quannhanId })
    const HTCVDetails = useQuery(['hinhthuccongviechopdong', hopdongId], fetchGetHTCV, { enabled: !!hopdongId })
    const { isLoading: isLoadingHopDong, data: quatrinhcongtacs } = queryHopDong
    const queryQuanNhan = useQuery({ queryKey: ['quannhans'], queryFn: getQuanNhanFromDonVi })
    const { isLoading: isLoadingQuanNhans, data: quannhans } = queryQuanNhan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsHopDong} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }
    const renderAction2 = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete2(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsHTCV} />
            </div>
        )
    }

    const onChange = () => { }
    useEffect(() => {
        if (isModalOpen2) {
            queryQuanNhan.refetch(); // Gọi queryQuanNhan khi isModalOpen2 thay đổi và isModalOpen2 = true
        }
    }, [isModalOpen2, queryQuanNhan.refetch]);
    const fetchGetDetailsHopDong = async (rowSelected) => {
        console.log("detail row");
        const res = await HopDongService.getDetailsHopDong(rowSelected)
        if (res?.data) {
            setStateHopDongDetails({
                HopDongId: res?.data.HopDongId,
                TenHopDong: res?.data.TenHopDong,
                BenA: res?.data.BenA,
                DonViChuTri: res?.data.DonViChuTri,
                GiaTriHopDong: res?.data.GiaTriHopDong,
                ThoiDiemKetThuc: res?.data.ThoiDiemKetThuc,
                ThoiDiemBatDau: res?.data.ThoiDiemBatDau,
                NguoiChuTri: res?.data.NguoiChuTri,
                SoThanhVien: res?.data.SoThanhVien,
                CacThanhVien: res?.data.CacThanhVien,
                NgayThanhLy: res?.data.NgayThanhLy,
                Tai: res?.data.Tai,
                FileCM: res?.data.FileCM,
                TrangThai: res?.data.TrangThai,
                CacHTCV: res?.data.CacHTCV,
                GhiChu: res?.data.GhiChu,

            })
        }

        console.log(res);
        console.log("xong detail row");
        setIsLoadingUpdate(false)
    }
    const fetchGetDetailsHTCV = async (rowSelected2) => {
        console.log("detail row");
        const res = await HTCVService.getDetailsHTCV(rowSelected2)
        if (res?.data) {
            setStateHTCVDetails({
                HinhThucCV: res?.data.HinhThucCV,
                QuanNhanId: res?.data.QuanNhanId,
                HoTen: res?.data.HoTen,

                DonVi: res?.data.DonVi,
                VaiTro: res?.data.VaiTro,
                SoGioQuyDoi: res?.data.SoGioQuyDoi,
                GhiChu: res?.data.GhiChu,
            })
        }
        console.log("abc");
        console.log(stateHTCVDetails);
        console.log("xong detail htcv");
        setIsLoadingUpdate(false)
    }



    // useEffect(() => {
    //     if (rowSelected) {
    //         fetchGetDetailsHopDong(rowSelected)
    //     }
    //     setIsLoadingUpdate(false)
    // }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateHopDongDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateHopDongDetails, isModalOpen])





    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

    };
    const handleReset = (clearFilters) => {
        clearFilters();

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
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Nội dung hợp đồng chuyển giao công nghệ',
            dataIndex: 'TenHopDong',
            key: 'TenHopDong',
            ...getColumnSearchProps('TenHopDong')
        },
        {
            title: 'Tác giả',
            dataIndex: 'NguoiChuTri',
            key: 'NguoiChuTri',
        },

        {
            title: 'Loại',
            dataIndex: 'Loai',
            key: 'Loai',
        },
        {
            title: 'Vai trò',
            dataIndex: 'VaiTro',
            key: 'VaiTro',
        },
        {
            title: 'Số tác giả',
            dataIndex: 'SoThanhVien',
            key: 'SoThanhVien',
        },

        {
            title: 'Tải',
            dataIndex: 'Tai',
            key: 'Tai',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
        },

        {
            title: 'Chức năng',
            dataIndex: 'action',
            render: renderAction
        },


    ];
    const columns3 = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },

        {
            title: 'Giáo viên',
            dataIndex: 'HoTen',
            key: 'HoTen',
        },

        // {
        //     title: 'Đơn vị',
        //     dataIndex: 'DonVi',
        //     key: 'DonVi',
        // },
        {
            title: 'Vai trò',
            dataIndex: 'VaiTro',
            key: 'VaiTro',
        },
        {
            title: 'Điểm',
            dataIndex: 'SoGioQuyDoi',
            key: 'SoGioQuyDoi',
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'TrangThai',
        //     key: 'TrangThai',
        // },
        {
            title: 'Chức năng',
            dataIndex: 'action',
            render: renderAction2
        },


    ];
    const columns2 = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Mã quân nhân',
            dataIndex: 'MaQuanNhan',
            key: 'MaQuanNhan',
            render: (text, record) => (
                <span onClick={() => handleNameClick(record.QuanNhanId, record._id)}>{text}</span>
            ),
        },
        {
            title: 'Tên quân nhân',
            dataIndex: 'HoTen',
            key: 'HoTen',
            render: (text, record) => (
                <span onClick={() => handleNameClick(record.HoTen, record._id)}>{text}</span>
            ),
            ...getColumnSearchProps('HoTen')
        },





    ];
    const handleNameClick = (name, objectId) => {
        setSelectedName(name); // Cập nhật giá trị của "Name"
        setStateHTCV(prevState => ({
            ...prevState,
            QuanNhanId: objectId,
            HoTen: name,
        }));
        console.log(stateHTCV);
    };
    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])
    useEffect(() => {
        if (isSuccessDelected2 && dataDeleted2?.status === 'OK') {
            message.success()
            handleCancelDelete2()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected2])

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDelectedMany])

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateHopDongDetails({
            HopDongId: '',
            TenHopDong: '',
            BenA: '',
            DonViChuTri: '',
            GiaTriHopDong: '',
            ThoiDiemKetThuc: '',
            ThoiDiemBatDau: '',
            NguoiChuTri: '',
            SoThanhVien: '',
            CacThanhVien: '',
            NgayThanhLy: '',
            Tai: '',
            FileCM: '',
            //     TrangThai:'',
            CacHTCV: '',
            GhiChu: '',
        })
        form.resetFields()
    };
    const handleCloseDrawer2 = () => {
        setIsOpenDrawer2(false);
        setStateHTCVDetails({
            HinhThucCV: '',
            QuanNhanId: '',
            HoTen: '',

            DonVi: '',
            VaiTro: '',
            SoGioQuyDoi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])
    useEffect(() => {
        if (isSuccessUpdated2 && dataUpdated2?.status === 'OK') {
            message.success()
            handleCloseDrawer2()
        } else if (isErrorUpdated2) {
            message.error()
        }
    }, [isSuccessUpdated])
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleCancelDelete2 = () => {
        setIsModalOpenDelete2(false)
    }


    const handleDeleteHopDong = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                hopdongDetails.refetch()
            }
        })
    }
    const handleDeleteHTCV = () => {
        mutationDeleted2.mutate({ id: rowSelected2, token: user?.access_token }, {
            onSettled: () => {
                HTCVDetails.refetch()
            }
        })
    }
    const handleCancel = () => {
        hopdongDetails.refetch();
        sethopdongId(null);
        setIsModalOpen(false);
        setStateHopDong({
            HopDongId: '',
            TenHopDong: '',
            BenA: '',
            DonViChuTri: '',
            GiaTriHopDong: '',
            ThoiDiemKetThuc: '',
            ThoiDiemBatDau: '',
            NguoiChuTri: '',
            SoThanhVien: '',
            CacThanhVien: '',
            NgayThanhLy: '',
            Tai: '',
            FileCM: '',
            //    TrangThai:'',
            CacHTCV: '',
            GhiChu: '',
        })
        form.resetFields()
    };
    const handleCancel2 = () => {

        setIsModalOpen2(false);
        setStateHTCV({
            HinhThucCV: '',
            QuanNhanId: '',
            HoTen: '',

            DonVi: '',
            VaiTro: '',
            SoGioQuyDoi: '',
            GhiChu: '',
        });
        // form.resetFields()
    };

    const onFinish = () => {
        const params = {

            HopDongId: stateHopDong.HopDongId,
            TenHopDong: stateHopDong.TenHopDong,
            BenA: stateHopDong.BenA,
            DonViChuTri: stateHopDong.DonViChuTri,
            GiaTriHopDong: stateHopDong.GiaTriHopDong,
            ThoiDiemKetThuc: stateHopDong.ThoiDiemKetThuc,
            ThoiDiemBatDau: stateHopDong.ThoiDiemBatDau,
            NguoiChuTri: stateHopDong.NguoiChuTri,
            SoThanhVien: stateHopDong.SoThanhVien,
            CacThanhVien: stateHopDong.CacThanhVien,

            NgayThanhLy: stateHopDong.NgayThanhLy,

            //  TrangThai: stateHopDong.TrangThai,


            Tai: stateHopDong.Tai,
            FileCM: stateHopDong.FileCM,
            CacHTCV: stateHopDong.CacHTCV,
            GhiChu: stateHopDong.GhiChu,
        }
        console.log("Finsh", stateHopDong)
        mutation.mutate(params, {
            onSettled: () => {
                // hopdongDetails.refetch()
            }
        })
    }

    const handleChangeCheckTHCSDT = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        console.log("e: ", e.target.name, e.target.value)
        setStateHopDong({
            ...stateHopDong,
            THCSDT: checkedValue,
            [e.target.name]: e.target.value
        });
    };
    const onFinish2 = async () => {
        console.log("HTCV");
        const params = {
            HinhThucCV: stateHTCV.HinhThucCV,
            HoTen: stateHTCV.HoTen,
            QuanNhanId: stateHTCV.QuanNhanId,

            DonVi: stateHTCV.DonVi,
            VaiTro: stateHTCV.VaiTro,
            SoGioQuyDoi: stateHTCV.SoGioQuyDoi,
            GhiChu: stateHTCV.GhiChu,
        }

        mutation2.mutate(params, {
            onSettled: () => {
                console.log("bat dau cv");
                console.log(htcvId);
                // onFinish3();
            }
        })
    }
    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }
    const onFinish3 = async () => {
        const data = {
            HTCVList: htcvId
        };

        try {
            const result = await HopDongService.updateHTCVLists(hopdongId, data, user?.access_token);

            if (result.status === 'OK') {
                message.success(result.message);
                HTCVDetails.refetch();
                // handleCancel();
                //nho them hopdongDetails.refetch()
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error(error);
            message.error('An error occurred');
        }

    };
    useEffect(() => {
        if (htcvId) {
            onFinish3();

        }
    }, [htcvId]);
    const handleAddButtonClick = () => {
        onFinish();
        setIsModalOpen2(true);
    }

    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateHopDong({
            ...stateHopDong,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchange2 = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateHTCV({
            ...stateHTCV,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {

        setStateHopDongDetails({
            ...stateHopDongDetails,
            [e.target.name]: e.target.value
        })


    }
    const handleOnchangeDetails2 = (e) => {

        setStateHTCVDetails({
            ...stateHTCVDetails,
            [e.target.name]: e.target.value
        })


    }

    const handleChangeSelectHopDongDetails = (value) => {
        setStateHTCVDetails({
            ...stateHTCVDetails,
            VaiTro: value
        })

    }
    const onUpdateHopDong = () => {
        console.log("bat dau update");
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateHopDongDetails }, {
            onSettled: () => {
                hopdongDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateHopDongDetails }, {
            onSettled: () => {
                hopdongDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateHopDongDetails }, {
            onSettled: () => {
                hopdongDetails.refetch()
            }
        })
    }
    function getTrangThaiText(statusValue) {
        switch (statusValue) {
            case 0:
                return 'Đang chờ phê duyệt';
            case 1:
                return 'Đã phê duyệt';
            case 2:
                return 'Đã từ chối - Nhập lại';
            default:
                return 'Trạng thái không hợp lệ';
        }
    }
    function getLoaiDeTaiext(statusValue) {

        if (statusValue > 100000000 && statusValue < 2000000000)
            return 'Hợp đồng chuyển giao từ 100 triệu dưới 2 tỷ';
        else if (statusValue > 2000000000)
            return 'Hợp đồng chuyển giao trên 2 tỷ';
        else
            return 'Không hợp lệ';

    }
    function getVaiTroText(a, b) {

        if (a == b)
            return 'Chủ trì hợp đồng';

        else
            return 'Thành viên';

    }
    const onUpdateHTCV = () => {
        console.log("bat dau update");
        mutationUpdate2.mutate({ id: rowSelected2, token: user?.access_token, ...stateHTCVDetails }, {
            onSettled: () => {
                HTCVDetails.refetch()
            }
        })
    }
    function getTrangThaiText(statusValue) {
        switch (statusValue) {
            case 0:
                return 'Đang chờ phê duyệt';
            case 1:
                return 'Đã phê duyệt';
            case 2:
                return 'Đã từ chối - Nhập lại';
            default:
                return 'Trạng thái không hợp lệ';
        }
    }



    const dataTable = hopdongDetails?.data?.length && hopdongDetails?.data?.map((hopdongDetails) => {
        return {
            ...hopdongDetails,
            key: hopdongDetails._id,
            TrangThai: getTrangThaiText(hopdongDetails.TrangThai),
            Loai: getLoaiDeTaiext(hopdongDetails.GiaTriHopDong),



        }
    })
    const dataTable2 = HTCVDetails?.data?.length && HTCVDetails?.data?.map((HTCVDetails) => {
        return { ...HTCVDetails, key: HTCVDetails._id }
    })
    const dataTable3 = quannhans?.data?.length && quannhans?.data?.map((quannhan) => {
        return { ...quannhan, key: quannhan._id }
    })
    useEffect(() => {
        if (isSuccessUpdatedNhapLai && dataUpdatedNhapLai?.status === 'OK') {
            message.success()
            handleCancelNhapLai()
        } else if (isErrorUpdatedNhapLai) {
            message.error()
        }
    }, [isSuccessUpdatedNhapLai])


    useEffect(() => {
        if (isSuccessUpdatedTT && dataUpdatedTT?.status === 'OK') {
            message.success()
            handleCancelPheDuyet()
        } else if (isErrorUpdatedTT) {
            message.error()
        }
    }, [isSuccessUpdatedTT])

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            // handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])


    const fetchAllHinhThucHuongDan = async () => {
        const res = await HinhThucHuongdanService.getAllType()
        return res
    }

    const allHinhThucHuongdan = useQuery({ queryKey: ['all-hinhthuchuongdan'], queryFn: fetchAllHinhThucHuongDan })
    const handleChangeSelect1 = (value) => {
        setStateHopDong({
            ...stateHopDong,
            HinhThucHuongDan: value
        })
        // console.log(stateQuanNhan)
    }

    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateHopDong({
            ...stateHopDong,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateHopDongDetails({
            ...stateHopDongDetails,
            FileCM: file.preview
        })
    }

    const handleChangeCheckTHCSDTDeTail = (e) => {
        const checkedValue = e.target.checked ? 1 : 0;
        setStateHopDongDetails({
            ...stateHopDongDetails,
            THCSDT: checkedValue,
        });
    };
    // Vai trò
    const fetchAllVaiTro = async () => {
        const res = await VaiTroService.getAllType()
        return res
    }

    const allVaiTro = useQuery({ queryKey: ['all-vaitro'], queryFn: fetchAllVaiTro })
    const handleChangeSelectVaiTro = (value) => {
        setStateHTCV({
            ...stateHTCV,
            HinhThucCV: value
        })

    }
    return (
        <div>
            <div>
                <WrapperHeader>Hợp đồng</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={hopdongDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingHopDong} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết hợp đồng" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        // onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >


                        <Form.Item
                            label="Tên hợp đồng"
                            name="TenHopDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDong.TenHopDong} onChange={handleOnchange} name="TenHopDong" />
                        </Form.Item>

                        <Form.Item
                            label="Bên A"
                            name="BenA"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDong.BenA} onChange={handleOnchange} name="BenA" />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị chủ trì"
                            name="DonViChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDong.DonViChuTri} onChange={handleOnchange} name="DonViChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="Giá trị hợp đồng"
                            name="GiaTriHopDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDong.GiaTriHopDong} onChange={handleOnchange} name="GiaTriHopDong" />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm bắt đầu"
                            //  name="ThoiDiemBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayBD} name="ThoiDiemBatDau"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm kết thúc"
                        //    name="ThoiDiemKetThuc"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayDKKT} name="ThoiDiemKetThuc"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Người chủ trì"
                            name="NguoiChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDong.NguoiChuTri} onChange={handleOnchange} name="NguoiChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="Số thành viên"
                            name="SoThanhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDong.SoThanhVien} onChange={handleOnchange} name="SoThanhVien" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày thanh lý"
                        //  name="NgayThanhLy"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayThu} name="NgayThanhLy"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tải"
                            name="Tai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDong.Tai} onChange={handleOnchange} name="Tai" />
                        </Form.Item>
                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateHopDong?.FileCM && (
                                    <img src={stateHopDong?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={handleAddButtonClick}>
                                Thêm HTCV
                            </Button>
                        </Form.Item>
                        <TableComponent columns={columns3} isLoading={isLoadingHopDong} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected(record._id);
                                }

                            };
                        }} />
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" onClick={handleCancel}>
                                Xong
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>

            <ModalComponent forceRender title="Thêm hình thức công việc" open={isModalOpen2} onCancel={handleCancel2} footer={null} width="70%">
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        // onFinish={onFinish2}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item label="Tên giáo viên" name="HoTen">
                            {selectedName}

                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="VaiTro"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHTCV.VaiTro} onChange={handleOnchange2} name="VaiTro" /> */}
                            <Select
                                name="VaiTro"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectVaiTro}
                                options={renderOptions(allVaiTro?.data?.data)}
                            />


                        </Form.Item>
                        <Form.Item
                            label="Số giờ"
                            name="SoGioQuyDoi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.SoGioQuyDoi} onChange={handleOnchange2} name="SoGioQuyDoi" />
                        </Form.Item>



                        <TableComponent columns={columns2} isLoading={isLoadingHopDong} data={dataTable3} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    // setRowSelected(record._id);
                                }

                            };
                        }} />


                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => { onFinish2(); }}>
                                Ghi
                            </Button>
                        </Form.Item>

                    </Form>
                </Loading>
            </ModalComponent>

            <DrawerComponent title='Cập nhật chi tiết hợp đồng' isOpen={isOpenDrawer} onClose={() => { setIsOpenDrawer(false); sethopdongId(null) }} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        // onFinish={onUpdateHopDong}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên hợp đồng"
                            name="TenHopDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDongDetails.TenHopDong} onChange={handleOnchangeDetails} name="TenHopDong" />
                        </Form.Item>

                        <Form.Item
                            label="Bên A"
                            name="BenA"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDongDetails.BenA} onChange={handleOnchangeDetails} name="BenA" />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị chủ trì"
                            name="DonViChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDongDetails.DonViChuTri} onChange={handleOnchangeDetails} name="DonViChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="Giá trị hợp đồng"
                            name="GiaTriHopDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDongDetails.GiaTriHopDong} onChange={handleOnchangeDetails} name="GiaTriHopDong" />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm bắt đầu"
                            //  name="ThoiDiemBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayBD}
                                onChange={handleOnchangeDetailNgayBD} name="ThoiDiemBatDau"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm kết thúc"
                        // name="ThoiDiemKetThuc"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayDKKT}
                                onChange={handleOnchangeDetailNgayDKKT} name="ThoiDiemKetThuc"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Người chủ trì"
                            name="NguoiChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDongDetails.NguoiChuTri} onChange={handleOnchangeDetails} name="NguoiChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="Số thành viên"
                            name="SoThanhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDongDetails.SoThanhVien} onChange={handleOnchangeDetails} name="SoThanhVien" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày thanh lý"
                        // name="NgayThanhLy"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayThu}
                                onChange={handleOnchangeDetailNgayThu} name="NgayThanhLy"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tải"
                            name="Tai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHopDongDetails.Tai} onChange={handleOnchangeDetails} name="Tai" />
                        </Form.Item>


                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateHopDongDetails?.FileCM && (
                                    <img src={stateHopDongDetails?.FileCM} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <TableComponent columns={columns3} isLoading={isLoadingHopDong} data={dataTable2} onRow={(record, rowSelected) => {
                            return {
                                onClick: event => {
                                    setRowSelected2(record._id);
                                }

                            };
                        }} />

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateHopDong}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <DrawerComponent title='Cập nhật chi tiết hình thức công việc' isOpen={isOpenDrawer2} onClose={() => setIsOpenDrawer2(false)} width="60%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated2}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        autoComplete="on"
                        form={form}
                    >


                        <Form.Item
                            label="Họ và tên"
                            name="HoTen"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.HoTen} />}
                            <InputComponent value={stateHTCVDetails.HoTen} onChange={handleOnchangeDetails2} name="HoTen" />
                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="VaiTro"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <Select value={stateHTCVDetails.VaiTro} />}
                            {/* <InputComponent value={stateHTCVDetails.HinhThucCV} onChange={handleOnchangeDetails2} name="HinhThucCV" /> */}
                            <Select
                                name="VaiTro"
                                value={stateHTCVDetails['VaiTro']}

                                onChange={handleChangeSelectHopDongDetails}
                                options={renderOptions(allVaiTro?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ"
                            name="SoGioQuyDoi"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {false && <InputComponent value={stateHTCVDetails.SoGioQuyDoi} />}
                            <InputComponent value={stateHTCVDetails.SoGioQuyDoi} onChange={handleOnchangeDetails2} name="SoGioQuyDoi" />
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={onUpdateHTCV}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa hợp đồng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteHopDong}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa hợp đồng này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Xóa công việc này" open={isModalOpenDelete2} onCancel={handleCancelDelete2} onOk={handleDeleteHTCV}>
                <Loading isLoading={isLoadingDeleted2}>
                    <div>Bạn có chắc xóa hình thức công việc này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt hợp đồng" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt hợp đồng này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin hợp đồng" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  hợp đồng này không?</div>
                </Loading>
            </ModalComponent>


        </div>

    );
};

export default HopDong;
