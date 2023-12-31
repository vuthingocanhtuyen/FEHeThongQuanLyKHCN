
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as TaiGiangDayService from '../../../../services/TaiGiangDayService';
import * as HTCVService from '../../../../services/HTCVService';
import * as CapHoiDongService from '../../../../services/CapHoiDongService';
import * as VaiTroHoiDongService from '../../../../services/VaiTroHoiDongService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
const TaiGiangDay = ({ }) => {
    
    const [htcvId, sethtcvId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        code: '',
        QuanNhanId: '',
        MaLop: '',
        MaMonHoc: '',
        TenMonHoc: '',
        SoTinChi: '',
        GioChuan: '',
        SiSo: '',
        HTDT: '',
        KetThuc: '',
        Quy: '',
        Nam: '',
        HocKy: '',
        HTThi: '',
        SoTiet: '',
        FileCM: '',
        THCSDT: '',
        CacHTCV: '',
        TrangThai: '',
        GhiChu: '',
    })
    const inittialHTCV = () => ({
        HinhThucCV: '',
        QuanNhanId: '',
        KhoiLuongCV: '',
        DonVi: '',
        SoTiet: '',
        SoGioQuyDoi: '',
        GhiChu: '',
    })
    const [stateTaiGiangDay, setStateTaiGiangDay] = useState(inittial())
    const [stateTaiGiangDayDetails, setStateTaiGiangDayDetails] = useState(inittial())
    const [stateHTCV, setStateHTCV] = useState(inittial())
    const [stateHTCVDetails, setStateHTCVDetails] = useState(inittialHTCV())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { code, QuanNhanId, MaLop, MaMonHoc, TenMonHoc, SoTinChi, GioChuan, SiSo, HTDT, KetThuc,Quy, Nam,HocKy,HTThi,SoTiet,FileCM,THCSDT,TrangThai,CacHTCV, edituser, edittime, GhiChu  } = data
            const res = TaiGiangDayService.createTaiGiangDay({
                code, QuanNhanId, MaLop, MaMonHoc, TenMonHoc, SoTinChi, GioChuan, SiSo, HTDT, KetThuc,Quy, Nam,HocKy,HTThi,SoTiet,FileCM,THCSDT,TrangThai,CacHTCV, edituser, edittime, GhiChu 
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
            const res = TaiGiangDayService.updateTaiGiangDay(
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
            const res = TaiGiangDayService.deleteTaiGiangDay(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = TaiGiangDayService.deleteManyTaiGiangDay(
                ids,
                token)
            return res
        },
    )


    const getAllTaiGiangDays = async () => {
        const res = await TaiGiangDayService.getAllTaiGiangDay()
        return res
    }

    // show
    
    
    const fetchGetTaiGiangDay = async (context) => {
        // const quannhanId = context?.queryKey && context?.queryKey[1]
        // console.log("iđn tai hd:", quannhanId)
        if (quannhanId) {

            const res = await TaiGiangDayService.getTaiGiangDayByQuanNhanId(quannhanId)
            console.log("tai giang day res: ", res)
            if (res?.data) {
                setStateTaiGiangDayDetails({
                    code: res?.data.code,
                    QuanNhanId: res?.data.QuanNhanId,
                    MaLop: res?.data.MaLop,
                    MaMonHoc: res?.data.MaMonHoc,
                    TenMonHoc: res?.data.TenMonHoc,
                    SoTinChi: res?.data.SoTinChi,
                    GioChuan: res?.data.GioChuan,
                    SiSo: res?.data.SiSo,
                    HTDT: res?.data.HTDT,
                    KetThuc: res?.data.KetThuc,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    HocKy: res?.data.HocKy,
                    HTThi: res?.data.HTThi,
                    SoTiet: res?.data.SoTiet,
                    FileCM: res?.data.FileCM,
                    THCSDT: res?.data.THCSDT,
                    TrangThai: res?.data.TrangThai,
                    CacHTCV: res?.data.CacHTCV
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiGiangDayDetails)
            // sethtcvId(res?.data.CacHTCV);
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    const fetchGetHTCV = async () => {
       
        if (htcvId) {

            const res = await HTCVService.getDetailsHTCV(htcvId)
            console.log("HTCV res: ", res)
            if (res?.data) {
                setStateHTCVDetails({
                    HinhThucCV: res?.data.HinhThucCV,
                    QuanNhanId: res?.data.QuanNhanId,
                    KhoiLuongCV: res?.data.KhoiLuongCV,
                    DonVi: res?.data.DonVi,
                    SoTiet: res?.data.SoTiet,
                    SoGioQuyDoi: res?.data.SoGioQuyDoi,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiGiangDayDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiGiangDayDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiGiangDayDetails, isModalOpen])
    useEffect(() => {
        if (!isModalOpen2) {
            form.setFieldsValue(stateHTCVDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateHTCVDetails, isModalOpen2])
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsTaiGiangDay(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsTaiGiangDay = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyTaiGiangDays = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                TaiGiangDayDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryTaiGiangDay = useQuery({ queryKey: ['TaiGiangDay'], queryFn: getAllTaiGiangDays })
    const TaiGiangDayDetails = useQuery(['hosoquannhanTaiGiangDay', quannhanId], fetchGetTaiGiangDay, { enabled: !!quannhanId })
    const HTCVDetails = useQuery(['hinhthuccongviec', htcvId], fetchGetHTCV, { enabled: !!htcvId })
    console.log("tai huong dan:", TaiGiangDayDetails.data, queryTaiGiangDay.data)
    const { isLoading: isLoadingTaiGiangDay, data: quatrinhcongtacs } = queryTaiGiangDay
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTaiGiangDay} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsTaiGiangDay = async (rowSelected) => {
        const res = await TaiGiangDayService.getDetailsTaiGiangDay(rowSelected)
        if (res?.data) {
            setStateTaiGiangDayDetails({
                code: res?.data.code,
                    QuanNhanId: res?.data.QuanNhanId,
                    MaLop: res?.data.MaLop,
                    MaMonHoc: res?.data.MaMonHoc,
                    TenMonHoc: res?.data.TenMonHoc,
                    SoTinChi: res?.data.SoTinChi,
                    GioChuan: res?.data.GioChuan,
                    SiSo: res?.data.SiSo,
                    HTDT: res?.data.HTDT,
                    KetThuc: res?.data.KetThuc,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    HocKy: res?.data.HocKy,
                    HTThi: res?.data.HTThi,
                    SoTiet: res?.data.SoTiet,
                    FileCM: res?.data.FileCM,
                    THCSDT: res?.data.THCSDT,
                    TrangThai: res?.data.TrangThai,
                    CacHTCV: res?.data.CacHTCV
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsTaiGiangDay(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])






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
            title: 'TenMonHoc',
            dataIndex: 'TenMonHoc',
            key: 'TenMonHoc',
        },
        {
            title: 'SiSo',
            dataIndex: 'SiSo',
            key: 'SiSo',
        },

        {
            title: 'MaLop',
            dataIndex: 'MaLop',
            key: 'MaLop',
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
    const columns2 = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'MaQuanNhan',
            dataIndex: 'MaQuanNhan',
            key: 'MaQuanNhan',
        },
        {
            title: 'Tên quân nhân',
            dataIndex: 'HoTen',
            key: 'HoTen',
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
        setStateTaiGiangDayDetails({
            code: '',
        QuanNhanId: '',
        MaLop: '',
        MaMonHoc: '',
        TenMonHoc: '',
        SoTinChi: '',
        GioChuan: '',
        SiSo: '',
        HTDT: '',
        KetThuc: '',
        Quy: '',
        Nam: '',
        HocKy: '',
        HTThi: '',
        SoTiet: '',
        FileCM: '',
        THCSDT: '',
        CacHTCV: '',
        TrangThai: '',
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

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }


    const handleDeleteTaiGiangDay = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                TaiGiangDayDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        
        setStateTaiGiangDay({
            code: '',
        QuanNhanId: '',
        MaLop: '',
        MaMonHoc: '',
        TenMonHoc: '',
        SoTinChi: '',
        GioChuan: '',
        SiSo: '',
        HTDT: '',
        KetThuc: '',
        Quy: '',
        Nam: '',
        HocKy: '',
        HTThi: '',
        SoTiet: '',
        FileCM: '',
        THCSDT: '',
        CacHTCV: '',
        TrangThai: '',
        GhiChu: '',
        });
       
        form.resetFields()
    };
    const handleCancel2 = () => {
        
        setIsModalOpen2(false);
        setStateHTCV({
            HinhThucCV: '',
            QuanNhanId: '',
            KhoiLuongCV: '',
            DonVi: '',
            SoTiet: '',
            SoGioQuyDoi: '',
            GhiChu: '',
        });
        form.resetFields()
    };

    const onFinish = () => {
        console.log("bat dau");
        const params = {
            code: stateTaiGiangDay.code,
            QuanNhanId: stateTaiGiangDay.QuanNhanId,
            MaLop: stateTaiGiangDay.MaLop,
            MaMonHoc: stateTaiGiangDay.MaMonHoc,
            TenMonHoc: stateTaiGiangDay.TenMonHoc,
            SoTinChi: stateTaiGiangDay.SoTinChi,
            GioChuan: stateTaiGiangDay.GioChuan,
            SiSo: stateTaiGiangDay.SiSo,
            HTDT: stateTaiGiangDay.HTDT,
            KetThuc: stateTaiGiangDay.KetThuc,
            Quy: stateTaiGiangDay.Quy,
            Nam: stateTaiGiangDay.Nam,
            HocKy: stateTaiGiangDay.HocKy,
            HTThi: stateTaiGiangDay.HTThi,
            SoTiet: stateTaiGiangDay.SoTiet,
            FileCM: stateTaiGiangDay.FileCM,
            THCSDT: stateTaiGiangDay.THCSDT,
            TrangThai: stateTaiGiangDay.TrangThai,
            CacHTCV: stateTaiGiangDay.CacHTCV,
            GhiChu: stateTaiGiangDay.GhiChu,
        }
        console.log("Finsh", stateTaiGiangDay)
        mutation.mutate(params, {
            onSettled: () => {
                TaiGiangDayDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
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
        console.log('check', e.target.name, e.target.value)
        setStateTaiGiangDayDetails({
            ...stateTaiGiangDayDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateTaiGiangDay = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiGiangDayDetails }, {
            onSettled: () => {
                TaiGiangDayDetails.refetch()
            }
        })
    }

    const dataTable = TaiGiangDayDetails?.data?.length && TaiGiangDayDetails?.data?.map((TaiGiangDayDetails) => {
        return { ...TaiGiangDayDetails, key: TaiGiangDayDetails._id }
    })
    const dataTable2 = HTCVDetails?.data?.length && HTCVDetails?.data?.map((HTCVDetails) => {
        return { ...HTCVDetails, key: HTCVDetails._id }
    })
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])




    //test



    //Cấp hội đồng
    const fetchAllCapHoiDong = async () => {
        const res = await CapHoiDongService.getAllType()
        return res
    }
    const allCapHoiDong = useQuery({ queryKey: ['all-caphoidong'], queryFn: fetchAllCapHoiDong })
    console.log("caphoidong:", allCapHoiDong.data)


    const fetchCapHoiDong = async () => {
        const res = await CapHoiDongService.getAllCapHoiDong();
        return res;
    };

    const CapHoiDongQuery = useQuery(['allcaphoidong'], fetchCapHoiDong);
    const CapHoiDong = CapHoiDongQuery.data;
    console.log("all caphoidong:", CapHoiDong);

    const handleChangeSelect1 = (value) => {
        const selectedCapHD = value;


        const filteredDataTable = Array.isArray(CapHoiDong) ? CapHoiDong.filter((data) => {
            return data.TenCapHoiDong === selectedCapHD;
        }) : [];


        console.log("all caphoidong1:", filteredDataTable,);

        console.log("loaihoidong:", filteredDataTable.map((option) => option.CapHoiDong || ' '), selectedCapHD);
        const tenLoaiOptions = filteredDataTable.map((option) => option.TenLoaiHoiDong);




        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            CapHoiDong: value,
            TenLoaiHoiDong: tenLoaiOptions[0],
            tenLoaiOptions: tenLoaiOptions,
        })
        console.log("Tên loại hội đồng: ", tenLoaiOptions)
    }

    //loại hội đồng

    const fetchAllLoaiHoiDong = async () => {

        const res = await CapHoiDongService.getAllTypeByLoaiHoiDong()
        return res
    }

    const allLoaiHoiDong = useQuery(['all-loaihoidong'], fetchAllLoaiHoiDong)
    console.log("loaihd: ", allLoaiHoiDong.data)

    const handleChangeSelect3 = (value) => {
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            LoaiHoiDong: value
        })
        // console.log(stateQuanNhan)
    }


    //vai trò hội đồng
    const fetchAllVaiTroHoiDOng = async () => {
        const res = await VaiTroHoiDongService.getAllType()
        return res
    }

    const allVaiTroHoiDong = useQuery({ queryKey: ['all-vaitrohoidong'], queryFn: fetchAllVaiTroHoiDOng })
    const handleChangeSelect2 = (value) => {
        setStateTaiGiangDay({
            ...stateTaiGiangDay,
            VaiTro: value
        })
        // console.log(stateQuanNhan)
    }
    return (
        <div>
            <div>
                <WrapperHeader>Tải giảng dạy</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={TaiGiangDayDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingTaiGiangDay} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết tải giảng dạy" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="Mã lớp"
                            name="MaLop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.MaLop} onChange={handleOnchange} name="MaLop" />
                        </Form.Item>
                        <Form.Item
                            label="Mã môn học"
                            name="MaMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.MaMonHoc} onChange={handleOnchange} name="MaMonHoc" />
                        </Form.Item>
                        <Form.Item
                            label="Tên môn học"
                            name="TenMonHoc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.TenMonHoc} onChange={handleOnchange} name="TenMonHoc" />
                        </Form.Item>

                        <Form.Item
                            label="SoTinChi"
                            name="SoTinChi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.SoTinChi} onChange={handleOnchange} name="SoTinChi" />
                        </Form.Item>
                        <Form.Item
                            label="GioChuan"
                            name="GioChuan"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDay.GioChuan} onChange={handleOnchange} name="GioChuan" />
                        </Form.Item>
                        
                        {/* <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <div style={{ marginTop: '10px' }}>
                             <Button onClick={() => setIsModalOpen2(true)} >Thêm HTCV</Button>
                        </div>
                        </Form.Item> */}
                        {/* <TableComponent columns={columns} isLoading={isLoadingTaiGiangDay} data={dataTable2} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                // setRowSelected(record._id);
                            }
                        };
                        }} /> */}
                        
                        
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit" >
                                Ghi
                            </Button>
                        </Form.Item>

                    </Form>
                </Loading>
            </ModalComponent>
            <ModalComponent forceRender title="Thêm hình thức công việc" open={isModalOpen2} onCancel={handleCancel2} footer={null} width="80%">
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
                            label="HinhThucCV"
                            name="HinhThucCV"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateHTCV.HinhThucCV} onChange={handleOnchange2} name="HinhThucCV" />
                        </Form.Item>
                        <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <div style={{ marginTop: '10px' }}>
                             <Button onClick={() => setIsModalOpen(true)}>Ghi</Button>
                        </div>
                        </Form.Item>
                        <TableComponent columns={columns2} isLoading={isLoadingTaiGiangDay} data={dataTable2} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                // setRowSelected(record._id);
                            }

                        };
                        }} />
                        
                        </Form>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Ghi
                            </Button>
                        </Form.Item>

                    </Form>
                </Loading>
            </ModalComponent>


            <DrawerComponent title='Cập nhật chi tiết tải hội đồng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateTaiGiangDay}
                        autoComplete="on"
                        form={form}
                    >


                        <Form.Item
                            label="Cấp hội đồng"
                            name="CapHoiDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="CapHoiDong"
                                onChange={handleChangeSelect1}
                                options={renderOptions(allCapHoiDong?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Loại hội đồng"
                            name="LoaiHoiDong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDayDetails['LoaiHoiDong']} onChange={handleOnchangeDetails} name="LoaiHoiDong" /> */}
                            <Select
                                name="LoaiHoiDong"
                                onChange={handleChangeSelect3}
                                options={renderOptions(allLoaiHoiDong?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="VaiTro"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiGiangDay.VaiTro} onChange={handleOnchange} name="VaiTro" />
                       */}
                            <Select
                                name="VaiTro"
                                onChange={handleChangeSelect2}
                                options={renderOptions(allVaiTroHoiDong?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Thời điểm"
                            name="ThoiDiem"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.ThoiDiem} onChange={handleOnchangeDetails} name="ThoiDiem" />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.Quy} onChange={handleOnchangeDetails} name="Quy" />


                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.Nam} onChange={handleOnchangeDetails} name="Nam" />
                        </Form.Item>

                        <Form.Item
                            label="Khối lượng công việc"
                            name="KhoiLuongCongViec"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.KhoiLuongCongViec} onChange={handleOnchangeDetails} name="KhoiLuongCongViec" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ quy đổi"
                            name="SoGioQuyDoi"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.SoGioQuyDoi} onChange={handleOnchangeDetails} name="SoGioQuyDoi" />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiGiangDayDetails.TrangThai} onChange={handleOnchangeDetails} name="TrangThai" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa tải giảng dạy" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTaiGiangDay}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tải giảng dạy này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TaiGiangDay;
