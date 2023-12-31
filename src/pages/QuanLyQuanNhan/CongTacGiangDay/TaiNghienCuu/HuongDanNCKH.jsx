
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as HuongDanNCKHService from '../../../../services/HuongDanNCKHService';
import * as LoaiDeTaiService from '../../../../services/LoaiDeTaiService';
import * as PhanLoaiKetQuaService from '../../../../services/PhanLoaiKetQuaNCKHService';
import * as DanhMucKhenThuongService from '../../../../services/DanhMucKhenThuongService';
import { renderOptions, getBase64 } from '../../../../utils'
import moment from 'moment';
import { WrapperHeader, WrapperUploadFile } from '../style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const HuongDanNCKH = ({ }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)
    const [NgayDKKT, setNgayDKKT] = useState('');
    const [NgayBD, setNgayBD] = useState('');
    const [NgayThu, setNgayThu] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        Ten: '',
        LoaiDeTai: '',
        DonViChuTri: '',
        ThoiGianBatDau: moment(),
        ThoiGianDuKienKetThuc: moment(),
        CacSinhVien: '',
        PhanLoaiKetQua: '',
        HinhThucKhenThuong: '',
        NgayNghiemThu: moment(),
        FileCM: '',
        Tai: '',
        TrangThai: '',
        GhiChu: ''
    })
    const [stateHuongDanNCKH, setStateHuongDanNCKH] = useState(inittial())
    const [stateHuongDanNCKHDetails, setStateHuongDanNCKHDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                Ten,
                LoaiDeTai,
                DonViChuTri,
                ThoiGianBatDau,
                ThoiGianDuKienKetThuc,
                CacSinhVien,
                PhanLoaiKetQua,
                HinhThucKhenThuong, FileCM,
                NgayNghiemThu,
                Tai,
                TrangThai = 0,
                GhiChu } = data
            const res = HuongDanNCKHService.createHuongDanNCKH({
                QuanNhanId, Ten,
                LoaiDeTai,
                DonViChuTri,
                ThoiGianBatDau,
                ThoiGianDuKienKetThuc,
                CacSinhVien,
                PhanLoaiKetQua,
                HinhThucKhenThuong,
                NgayNghiemThu, FileCM,
                Tai,
                TrangThai,
                GhiChu
            })
            console.log("data create qtct:", res.data)
            return res

        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log("data update:", data)
            const { id,
                token,
                ...rests } = data
            const res = HuongDanNCKHService.updateHuongDanNCKH(
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
            const res = HuongDanNCKHService.updateHuongDanNCKH(id, token, updatedData);
            return res;

        },

    )

    // ngày dự kiến kết thúc
    useEffect(() => {
        setNgayDKKT(moment(stateHuongDanNCKHDetails['ThoiGianDuKienKetThuc']));
        // setNgayQD(convertDateToString(stateHuongDanNCKHDetails['NgayQuyetDinh']));
    }, [form, stateHuongDanNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayDKKT = (date) => {
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            ThoiGianDuKienKetThuc: date
        })
    }
    const handleOnchangeNgayDKKT = (date) => {
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            ThoiGianDuKienKetThuc: date
        })
    }
    // ngày bắt đầu
    useEffect(() => {
        setNgayBD(moment(stateHuongDanNCKHDetails['ThoiGianBatDau']));
        // setNgayQD(convertDateToString(stateHuongDanNCKHDetails['NgayQuyetDinh']));
    }, [form, stateHuongDanNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayBD = (date) => {
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            ThoiGianBatDau: date
        })
    }
    const handleOnchangeNgayBD = (date) => {
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            ThoiGianBatDau: date
        })
    }


    // ngày nghiệm thu
    useEffect(() => {
        setNgayThu(moment(stateHuongDanNCKHDetails['NgayNghiemThu']));
        // setNgayQD(convertDateToString(stateHuongDanNCKHDetails['NgayQuyetDinh']));
    }, [form, stateHuongDanNCKHDetails, isOpenDrawer])

    const handleOnchangeDetailNgayThu = (date) => {
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            NgayNghiemThu: date
        })
    }
    const handleOnchangeNgayThu = (date) => {
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            NgayNghiemThu: date
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
            const res = HuongDanNCKHService.updateHuongDanNCKH(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = HuongDanNCKHService.deleteHuongDanNCKH(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = HuongDanNCKHService.deleteManyHuongDanNCKH(
                ids,
                token)
            return res
        },
    )


    const getAllHuongDanNCKHs = async () => {
        const res = await HuongDanNCKHService.getAllHuongDanNCKH()
        return res
    }

    // show


    const fetchGetHuongDanNCKH = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("iđn tai hd:", quannhanId)
        if (quannhanId) {

            const res = await HuongDanNCKHService.getHuongDanNCKHByQuanNhanId(quannhanId)
            console.log("taihd res: ", res)
            if (res?.data) {
                setStateHuongDanNCKHDetails({
                    Ten: res?.data.Ten,
                    LoaiDeTai: res?.data.LoaiDeTai,
                    DonViChuTri: res?.data.DonViChuTri,
                    ThoiGianBatDau: res?.data.ThoiGianBatDau,
                    ThoiGianDuKienKetThuc: res?.data.ThoiGianDuKienKetThuc,
                    CacSinhVien: res?.data.CacSinhVien,
                    PhanLoaiKetQua: res?.data.PhanLoaiKetQua,
                    HinhThucKhenThuong: res?.data.HinhThucKhenThuong,
                    NgayNghiemThu: res?.data.NgayNghiemThu,
                    FileCM: res?.data.FileCM,
                    Tai: res?.data.Tai,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu

                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateHuongDanNCKHDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateHuongDanNCKHDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateHuongDanNCKHDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsHuongDanNCKH(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsHuongDanNCKH = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyHuongDanNCKHs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                huongdannckhDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai

    const queryHuongDanNCKH = useQuery({ queryKey: ['huongdannckh'], queryFn: getAllHuongDanNCKHs })
    const huongdannckhDetails = useQuery(['hosoquannhanhuongdannckh', quannhanId], fetchGetHuongDanNCKH, { enabled: !!quannhanId })
    console.log("tai huong dan:", huongdannckhDetails.data, queryHuongDanNCKH.data)
    const { isLoading: isLoadingHuongDanNCKH, data: quatrinhcongtacs } = queryHuongDanNCKH
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsHuongDanNCKH} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsHuongDanNCKH = async (rowSelected) => {
        const res = await HuongDanNCKHService.getDetailsHuongDanNCKH(rowSelected)
        if (res?.data) {
            setStateHuongDanNCKHDetails({
                Ten: res?.data.Ten,
                LoaiDeTai: res?.data.LoaiDeTai,
                DonViChuTri: res?.data.DonViChuTri,
                ThoiGianBatDau: res?.data.ThoiGianBatDau,
                ThoiGianDuKienKetThuc: res?.data.ThoiGianDuKienKetThuc,
                CacSinhVien: res?.data.CacSinhVien,
                PhanLoaiKetQua: res?.data.PhanLoaiKetQua,
                HinhThucKhenThuong: res?.data.HinhThucKhenThuong,
                NgayNghiemThu: res?.data.NgayNghiemThu,
                Tai: res?.data.Tai,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu

            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsHuongDanNCKH(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateHuongDanNCKHDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateHuongDanNCKHDetails, isModalOpen])





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

    const TinhSoTacGia = () => {
        const soLuongSinhVien = columns[5].dataIndex.length;
        columns[0].dataIndex = soLuongSinhVien;
    };



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Tiêu đề',
            dataIndex: 'Ten',
            key: 'Ten',
        },
        {
            title: 'Loại',
            dataIndex: 'LoaiDeTai',
            key: 'LoaiDeTai',
        },
        {
            title: 'Vai trò',
            dataIndex: 'VaiTro',
            key: 'VaiTro',
        },
        {
            title: 'Số tác giả',
            dataIndex: 'SoTacGia',
            key: 'SoTacGia',
        },
        {
            title: 'Sinh viên',
            dataIndex: 'CacSinhVien',
            key: 'CacSinhVien',
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
    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

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
        setStateHuongDanNCKHDetails({
            Ten: '',
            LoaiDeTai: '',
            DonViChuTri: '',
            ThoiGianBatDau: '',
            ThoiGianDuKienKetThuc: '',
            CacSinhVien: '',
            PhanLoaiKetQua: '',
            HinhThucKhenThuong: '',
            NgayNghiemThu: '',
            Tai: '',
            FileCM: '',
            GhiChu: ''
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

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }


    const handleDeleteHuongDanNCKH = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                huongdannckhDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateHuongDanNCKH({
            Ten: '',
            LoaiDeTai: '',
            DonViChuTri: '',
            ThoiGianBatDau: '',
            ThoiGianDuKienKetThuc: '',
            CacSinhVien: '',
            PhanLoaiKetQua: '',
            HinhThucKhenThuong: '',
            NgayNghiemThu: '',
            Tai: '',
            FileCM: '',
            GhiChu: ''

        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            Ten: stateHuongDanNCKH.Ten,
            LoaiDeTai: stateHuongDanNCKH.LoaiDeTai,
            DonViChuTri: stateHuongDanNCKH.DonViChuTri,
            ThoiGianBatDau: stateHuongDanNCKH.ThoiGianBatDau,
            ThoiGianDuKienKetThuc: stateHuongDanNCKH.ThoiGianDuKienKetThuc,
            CacSinhVien: stateHuongDanNCKH.CacSinhVien,
            PhanLoaiKetQua: stateHuongDanNCKH.PhanLoaiKetQua,
            HinhThucKhenThuong: stateHuongDanNCKH.HinhThucKhenThuong,
            NgayNghiemThu: stateHuongDanNCKH.NgayNghiemThu,
            FileCM: stateHuongDanNCKH.FileCM,
            Tai: stateHuongDanNCKH.Tai,
            //    TrangThai: stateHuongDanNCKH.TrangThai,
            GhiChu: stateHuongDanNCKH.GhiChu

        }
        // if (stateHuongDanNCKH.ThoiGianDuKienKetThuc <= stateHuongDanNCKH.ThoiGianBatDau) {
        //     console.log("ThoiGianDuKienKetThuc must be after ThoiGianBatDau. Invalid!");
        //     // Display an error message or take appropriate action
        //     message.error("Thời gian kết thúc chưa phù hợp, nhập lại")
        //     return;
        // }
        // if (stateHuongDanNCKH.NgayNghiemThu <= stateHuongDanNCKH.ThoiGianBatDau) {
        //     console.log("ThoiGianDuKienKetThuc must be after ThoiGianBatDau. Invalid!");
        //     // Display an error message or take appropriate action
        //     message.error("Ngày nghiệm thu chưa phù hợp, nhập lại")
        //     return;
        // }
        console.log("Finsh", stateHuongDanNCKH)
        mutation.mutate(params, {
            onSettled: () => {
                huongdannckhDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateHuongDanNCKH = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateHuongDanNCKHDetails }, {
            onSettled: () => {
                huongdannckhDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateHuongDanNCKHDetails }, {
            onSettled: () => {
                huongdannckhDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateHuongDanNCKHDetails }, {
            onSettled: () => {
                huongdannckhDetails.refetch()
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



    function getSoLuongSinhVien(value) {
        const count = value.split(',').length - 1;
        return count;
    }

    function getVaiSinhVien(value) {
        const count = value.split(',').length - 1;
        switch (count + 1) {
            case 1:
                return 'Chủ đề tài';
            case 2:
                return 'Nhóm đề tài';

            default:
                return 'Trạng thái không hợp lệ';
        }
    }

    const dataTable = huongdannckhDetails?.data?.length > 0 && huongdannckhDetails?.data?.map((huongdannckhDetails) => {
        return {
            ...huongdannckhDetails,
            key: huongdannckhDetails._id,
            TrangThai: getTrangThaiText(huongdannckhDetails.TrangThai),
            SoTacGia: getSoLuongSinhVien(huongdannckhDetails.CacSinhVien) + 1,
            VaiTro: getVaiSinhVien(huongdannckhDetails.CacSinhVien)

        }
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
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])


    // loại đề tài

    const fetchAllLoaiDeTai = async () => {
        const res = await LoaiDeTaiService.getAllType()
        return res
    }

    const allLoaiDeTai = useQuery({ queryKey: ['all-loaidetai'], queryFn: fetchAllLoaiDeTai })
    const handleChangeSelect1 = (value) => {
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            LoaiDeTai: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeSelectLoaiDeTaiDetail = (value) => {
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            LoaiDeTai: value
        })
        // console.log(stateQuanNhan)
    }


    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            FileCM: file.preview
        })
    }
    //phân loại kết quả
    const fetchAllPLKQ = async () => {
        const res = await PhanLoaiKetQuaService.getAllType()
        return res
    }

    const allPhanLoaiKetQua = useQuery({ queryKey: ['all-phanloaiketqua'], queryFn: fetchAllPLKQ })
    const handleChangeSelect2 = (value) => {
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            PhanLoaiKetQua: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeSelect2DeTails = (value) => {
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            PhanLoaiKetQua: value
        })
        // console.log(stateQuanNhan)
    }

    //hình thức khen thywonge
    const fetchAllKhenThuong = async () => {
        const res = await DanhMucKhenThuongService.getAllType()
        return res
    }

    const allKhenThuong = useQuery({ queryKey: ['all-khenthuong'], queryFn: fetchAllKhenThuong })
    const handleChangeSelectKhenThuong = (value) => {
        setStateHuongDanNCKH({
            ...stateHuongDanNCKH,
            HinhThucKhenThuong: value
        })
        // console.log(stateQuanNhan)
    }
    const handleChangeSelectKhenThuongDeTails = (value) => {
        setStateHuongDanNCKHDetails({
            ...stateHuongDanNCKHDetails,
            HinhThucKhenThuong: value
        })
        // console.log(stateQuanNhan)
    }


    return (
        <div>
            <div>
                <WrapperHeader>Hướng dẫn NCKH</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={huongdannckhDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingHuongDanNCKH} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm hướng dẫn nghiên cứu sinh viên" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}

                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên"
                            name="Ten"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKH['Ten']} onChange={handleOnchange} name="Ten" />
                        </Form.Item>
                        <Form.Item
                            label="Loại đề tài"
                            name="LoaiDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHuongDanNCKH['LoaiDeTai']} onChange={handleOnchange} name="LoaiDeTai" /> */}
                            <Select
                                name="LoaiDeTai"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allLoaiDeTai?.data?.data)}
                            />


                        </Form.Item>


                        <Form.Item
                            label="Đơn vị chủ trì"
                            name="DonViChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKH.DonViChuTri} onChange={handleOnchange} name="DonViChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="Thời gian bắt đầu"
                            // name="ThoiGianBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayBD} name="ThoiGianBatDau"
                                format="DD/MM/YYYY"
                            />
                            {/* <InputComponent value={stateHuongDanNCKH.ThoiGianBatDau} onChange={handleOnchange} name="ThoiGianBatDau" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Thời gian dự kiến kết thúc"
                            //   name="ThoiGianDuKienKetThuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayDKKT} name="ThoiGianDuKienKetThuc"
                                format="DD/MM/YYYY"
                            />
                            {/* <InputComponent value={stateHuongDanNCKH.ThoiGianDuKienKetThuc} onChange={handleOnchange} name="ThoiGianDuKienKetThuc" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Các sinh viên"
                            name="CacSinhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKH.CacSinhVien} onChange={handleOnchange} name="CacSinhVien" />
                        </Form.Item>
                        <Form.Item
                            label="Phân loại kết quả"
                            name="PhanLoaiKetQua"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHuongDanNCKH.PhanLoaiKetQua} onChange={handleOnchange} name="PhanLoaiKetQua" /> */}

                            <Select
                                name="PhanLoaiKetQua"
                                onChange={handleChangeSelect2}
                                options={renderOptions(allPhanLoaiKetQua?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hình thức khen thưởng"
                            name="HinhThucKhenThuong"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHuongDanNCKH.HinhThucKhenThuong} onChange={handleOnchange} name="HinhThucKhenThuong" /> */}
                            <Select
                                name="HinhThucKhenThuong"
                                onChange={handleChangeSelectKhenThuong}
                                options={renderOptions(allKhenThuong?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tải"
                            name="Tai"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKH.Tai} onChange={handleOnchange} name="Tai" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày nghiệm thu"
                        //  name="NgayNghiemThu"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >

                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayThu} name="NgayNghiemThu"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        {/* <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKH.TrangThai} onChange={handleOnchange} name="TrangThai" />
                        </Form.Item> */}

                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateHuongDanNCKH?.FileCM && (
                                    <img src={stateHuongDanNCKH?.FileCM} style={{
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
                            <Button type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>


            <DrawerComponent title='Cập nhật chi tiết hướng dẫn nghiên cứu sinh viên' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateHuongDanNCKH}
                        autoComplete="on"
                        form={form}
                    >

                        <Form.Item
                            label="Tên"
                            name="Ten"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKHDetails['Ten']} onChange={handleOnchangeDetails} name="Ten" />
                        </Form.Item>
                        <Form.Item
                            label="Loại đề tài"
                            name="LoaiDeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHuongDanNCKHDetails['LoaiDeTai']} onChange={handleOnchangeDetails} name="LoaiDeTai" /> */}
                            <Select
                                name="LoaiDeTai"
                                onChange={handleChangeSelectLoaiDeTaiDetail}
                                options={renderOptions(allLoaiDeTai?.data?.data)}
                            />

                        </Form.Item>


                        <Form.Item
                            label="Đơn vị chủ trì"
                            name="DonViChuTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKHDetails.DonViChuTri} onChange={handleOnchangeDetails} name="DonViChuTri" />
                        </Form.Item>
                        <Form.Item
                            label="Thời gian bắt đầu"
                            // name="ThoiGianBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayBD}
                                onChange={handleOnchangeDetailNgayBD} name="ThoiGianBatDau"
                                format="DD/MM/YYYY"
                            />

                            {/* <InputComponent value={stateHuongDanNCKHDetails.ThoiGianBatDau} onChange={handleOnchangeDetails} name="ThoiGianBatDau" /> */}

                        </Form.Item>
                        <Form.Item
                            label="Thời gian dự kiến kết thúc"
                            /// name="ThoiGianDuKienKetThuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayDKKT}
                                onChange={handleOnchangeDetailNgayDKKT} name="ThoiGianDuKienKetThuc"
                                format="DD/MM/YYYY"
                            />

                        </Form.Item>
                        <Form.Item
                            label="Các sinh viên"
                            name="CacSinhVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKHDetails.CacSinhVien} onChange={handleOnchangeDetails} name="CacSinhVien" />
                        </Form.Item>
                        <Form.Item
                            label="Phân loại kết quả"
                            name="PhanLoaiKetQua"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHuongDanNCKHDetails.PhanLoaiKetQua} onChange={handleOnchangeDetails} name="PhanLoaiKetQua" /> */}
                            <Select
                                name="PhanLoaiKetQua"
                                onChange={handleChangeSelect2DeTails}
                                options={renderOptions(allPhanLoaiKetQua?.data?.data)}
                            />


                        </Form.Item>
                        <Form.Item
                            label="Hình thức khen thưởng"
                            name="HinhThucKhenThuong"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateHuongDanNCKHDetails.HinhThucKhenThuong} onChange={handleOnchangeDetails} name="HinhThucKhenThuong" /> */}
                            <Select
                                name="HinhThucKhenThuong"
                                onChange={handleChangeSelectKhenThuongDeTails}
                                options={renderOptions(allKhenThuong?.data?.data)}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Tải"
                            name="Tai"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKHDetails.Tai} onChange={handleOnchangeDetails} name="Tai" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày nghiệm thu"
                        >

                            <DatePicker
                                value={NgayThu}
                                onChange={handleOnchangeDetailNgayThu} name="NgayNghiemThu"
                                format="DD/MM/YYYY"
                            />

                        </Form.Item>
                        {/* <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHuongDanNCKHDetails.TrangThai} onChange={handleOnchangeDetails} name="TrangThai" />
                        </Form.Item> */}

                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateHuongDanNCKHDetails?.FileCM && (
                                    <img src={stateHuongDanNCKHDetails?.FileCM} style={{
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
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa hướng dẫn NCKH" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteHuongDanNCKH}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa hướng dẫn NCKH này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Phê quyệt hướng dẫn NCKH" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt hướng dẫn NCKH này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin hướng dẫn NCKH" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  hướng dẫn NCKH này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default HuongDanNCKH;
