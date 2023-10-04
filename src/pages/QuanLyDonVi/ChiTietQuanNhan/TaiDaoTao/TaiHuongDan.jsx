
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { renderOptions, getBase64 } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as TaiHuongDanService from '../../../../services/TaiHuongDanService';
import * as HinhThucHuongdanService from '../../../../services/HinhThucHuongDanService';
import { WrapperHeader, WrapperUploadFile } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'
import moment from 'moment';
import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
import 'antd/dist/antd.css';
const TaiHuongDan = ({ quannhanId }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [NgayBD, setNgayBD] = useState('');
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

    const inittial = () => ({
        HinhThucHuongDan: '',
        HocVien: '',
        Lop: '',
        DeTai: '',
        NgayBatDau: moment(),
        Quy: '',
        Nam: '',
        SoCBHuongDan: '',
        DinhMuc: '',
        FileCM: '',
        SoGioChuan: '',
        TrangThai: '',
        GhiChu: '',
    })
    const [stateTaiHuongDan, setStateTaiHuongDan] = useState(inittial())
    const [stateTaiHuongDanDetails, setStateTaiHuongDanDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                HinhThucHuongDan,
                HocVien,
                Lop,
                DeTai,
                NgayBatDau,
                Quy,
                Nam,
                SoCBHuongDan,
                DinhMuc, FileCM,
                SoGioChuan,
                TrangThai = 0,

                GhiChu } = data
            const res = TaiHuongDanService.createTaiHuongDan({
                QuanNhanId, HinhThucHuongDan,
                HocVien,
                Lop,
                DeTai,
                NgayBatDau,
                Quy,
                Nam,
                SoCBHuongDan,
                DinhMuc,
                SoGioChuan,
                TrangThai, FileCM,
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
            const res = TaiHuongDanService.updateTaiHuongDan(
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
            const res = TaiHuongDanService.updateTaiHuongDan(id, token, updatedData);
            return res;

        },

    )

    useEffect(() => {
        setNgayBD(moment(stateTaiHuongDanDetails['NgayBatDau']));
        // setNgayQD(convertDateToString(stateQuaTrinhCongTacDetails['NgayQuyetDinh']));
    }, [form, stateTaiHuongDanDetails, isOpenDrawer])

    const handleOnchangeDetailNgayBD = (date) => {
        setStateTaiHuongDanDetails({
            ...stateTaiHuongDanDetails,
            NgayBatDau: date
        })
    }
    const handleOnchangeNgayBD = (date) => {
        setStateTaiHuongDan({
            ...stateTaiHuongDan,
            NgayBatDau: date
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
            const res = TaiHuongDanService.updateTaiHuongDan(id, token, updatedData);
            return res;

        },

    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = TaiHuongDanService.deleteTaiHuongDan(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = TaiHuongDanService.deleteManyTaiHuongDan(
                ids,
                token)
            return res
        },
    )


    const getAllTaiHuongDans = async () => {
        const res = await TaiHuongDanService.getAllTaiHuongDan()
        return res
    }

    // show


    const fetchGetTaiHuongDan = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("iđn tai hd:", quannhanId)
        if (quannhanId) {

            const res = await TaiHuongDanService.getTaiHuongDanByQuanNhanId(quannhanId)
            console.log("taihd res: ", res)
            if (res?.data) {
                setStateTaiHuongDanDetails({
                    HinhThucHuongDan: res?.data.HinhThucHuongDan,
                    HocVien: res?.data.HocVien,
                    Lop: res?.data.Lop,
                    DeTai: res?.data.DeTai,
                    NgayBatDau: res?.data.NgayBatDau,
                    Quy: res?.data.Quy,
                    Nam: res?.data.Nam,
                    SoCBHuongDan: res?.data.SoCBHuongDan,
                    DinhMuc: res?.data.DinhMuc,
                    FileCM: res?.data.FileCM,
                    SoGioChuan: res?.data.SoGioChuan,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiHuongDanDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiHuongDanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiHuongDanDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsTaiHuongDan(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsTaiHuongDan = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyTaiHuongDans = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                taihuongdanDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai


    const queryTaiHuongDan = useQuery({ queryKey: ['taihuongdan'], queryFn: getAllTaiHuongDans })
    const taihuongdanDetails = useQuery(['hosoquannhantaihuongdan', quannhanId], fetchGetTaiHuongDan, { enabled: !!quannhanId })
    const { isLoading: isLoadingTaiHuongDan, data: quatrinhcongtacs } = queryTaiHuongDan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTaiHuongDan} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsTaiHuongDan = async (rowSelected) => {
        const res = await TaiHuongDanService.getDetailsTaiHuongDan(rowSelected)
        if (res?.data) {
            setStateTaiHuongDanDetails({
                HinhThucHuongDan: res?.data.HinhThucHuongDan,
                HocVien: res?.data.HocVien,
                Lop: res?.data.Lop,
                DeTai: res?.data.DeTai,
                NgayBatDau: res?.data.NgayBatDau,
                Quy: res?.data.Quy,
                Nam: res?.data.Nam,
                SoCBHuongDan: res?.data.SoCBHuongDan,
                DinhMuc: res?.data.DinhMuc,
                FileCM: res?.data.FileCM,
                SoGioChuan: res?.data.SoGioChuan,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsTaiHuongDan(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiHuongDanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiHuongDanDetails, isModalOpen])





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
            title: 'Họ và tên học viên',
            dataIndex: 'HocVien',
            key: 'HocVien',
        },
        {
            title: 'Lớp',
            dataIndex: 'Lop',
            key: 'Lop',
        },
        {
            title: 'Tên đề tài',
            dataIndex: 'DeTai',
            key: 'DeTai',
        },
        {
            title: 'Định mức',
            dataIndex: 'DinhMuc',
            key: 'DinhMuc',
        },
        {
            title: 'Số CBHD',
            dataIndex: 'SoCBHuongDan',
            key: 'SoCBHuongDan',
        },
        {
            title: 'Số giờ',
            dataIndex: 'SoGioChuan',
            key: 'SoGioChuan',
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
        setStateTaiHuongDanDetails({
            HinhThucHuongDan: '',
            HocVien: '',
            Lop: '',
            DeTai: '',
            NgayBatDau: '',
            Quy: '',
            Nam: '',
            SoCBHuongDan: '',
            DinhMuc: '',
            FileCM: '',
            SoGioChuan: '',
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


    const handleDeleteTaiHuongDan = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                taihuongdanDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateTaiHuongDan({
            HinhThucHuongDan: '',
            HocVien: '',
            Lop: '',
            DeTai: '',
            NgayBatDau: '',
            Quy: '',
            Nam: '',
            SoCBHuongDan: '',
            DinhMuc: '',
            FileCM: '',
            SoGioChuan: '',
            TrangThai: '',

        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            HinhThucHuongDan: stateTaiHuongDan.HinhThucHuongDan,
            HocVien: stateTaiHuongDan.HocVien,
            Lop: stateTaiHuongDan.Lop,
            DeTai: stateTaiHuongDan.DeTai,
            NgayBatDau: stateTaiHuongDan.NgayBatDau,
            Quy: stateTaiHuongDan.Quy,
            Nam: stateTaiHuongDan.Nam,
            SoCBHuongDan: stateTaiHuongDan.SoCBHuongDan,
            DinhMuc: stateTaiHuongDan.DinhMuc,
            SoGioChuan: stateTaiHuongDan.SoCBHuongDan,
            FileCM: stateTaiHuongDan.FileCM,
            GhiChu: stateTaiHuongDan.GhiChu,
        }
        console.log("Finsh", stateTaiHuongDan)
        mutation.mutate(params, {
            onSettled: () => {
                taihuongdanDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)

        setStateTaiHuongDan({
            ...stateTaiHuongDan,
            [e.target.name]: e.target.value,

        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateTaiHuongDanDetails({
            ...stateTaiHuongDanDetails,
            [e.target.name]: e.target.value

        })
    }


    const onUpdateTaiHuongDan = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiHuongDanDetails }, {
            onSettled: () => {
                taihuongdanDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiHuongDanDetails }, {
            onSettled: () => {
                taihuongdanDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiHuongDanDetails }, {
            onSettled: () => {
                taihuongdanDetails.refetch()
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

    const dataTable = taihuongdanDetails?.data?.length > 0 && taihuongdanDetails?.data?.map((taihuongdanDetails) => {
        return {
            ...taihuongdanDetails,
            key: taihuongdanDetails._id,
            TrangThai: getTrangThaiText(taihuongdanDetails.TrangThai)

        }
    })


    const handleOnchangeFileCM = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiHuongDan({
            ...stateTaiHuongDan,
            FileCM: file.preview
        })
    }


    const handleOnchangeFileCMDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateTaiHuongDanDetails({
            ...stateTaiHuongDanDetails,
            FileCM: file.preview
        })
    }





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


    const fetchAllHinhThucHuongDan = async () => {
        const res = await HinhThucHuongdanService.getAllType()
        return res
    }

    const allHinhThucHuongdan = useQuery({ queryKey: ['all-hinhthuchuongdan'], queryFn: fetchAllHinhThucHuongDan })
    const handleChangeSelect1 = (value) => {
        setStateTaiHuongDan({
            ...stateTaiHuongDan,
            HinhThucHuongDan: value
        })
        // console.log(stateQuanNhan)
    }


    const handleChangeSelectDetails = (value) => {
        setStateTaiHuongDanDetails({
            ...stateTaiHuongDanDetails,
            HinhThucHuongDân: value
        })
        // console.log(stateQuanNhan)
    }

    return (
        <div>
            <div>
                <WrapperHeader>Tải hướng dẫn</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={taihuongdanDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingTaiHuongDan} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm chi tiết tải hướng dẫn" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
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
                            label="Hình thức hướng dẫn"
                            name="HinhThucHuongDan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiHuongDan['HinhThucHuongDan']} onChange={handleOnchange} name="HinhThucHuongDan" /> */}
                            <Select
                                name="HinhThucHuongDan"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allHinhThucHuongdan?.data?.data)}
                            />


                        </Form.Item>

                        <Form.Item
                            label="Học viên"
                            name="HocVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan['HocVien']} onChange={handleOnchange} name="HocVien" />
                        </Form.Item>

                        <Form.Item
                            label="Lớp"
                            name="Lop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.Lop} onChange={handleOnchange} name="Lop" />
                        </Form.Item>
                        <Form.Item
                            label="Đề tài"
                            name="DeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.DeTai} onChange={handleOnchange} name="DeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày bắt đầu"
                            //  name="NgayBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiHuongDan.NgayBatDau} onChange={handleOnchange} name="NgayBatDau" /> */}
                            {/* <DatePicker value={stateTaiHuongDan.NgayBatDau} onChange={handleOnchange} name="NgayBatDau" /> */}
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayBD} name="NgayBatDau"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.Quy} onChange={handleOnchange} name="Quy" />
                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.Nam} onChange={handleOnchange} name="Nam" />
                        </Form.Item>
                        <Form.Item
                            label="Số CB hướng dẫn"
                            name="SoCBHuongDan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.SoCBHuongDan} onChange={handleOnchange} name="SoCBHuongDan" />
                        </Form.Item>
                        <Form.Item
                            label="Định mức"
                            name="DinhMuc"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.DinhMuc} onChange={handleOnchange} name="DinhMuc" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ chuẩn"
                            name="SoGioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.SoGioChuan} onChange={handleOnchange} name="SoGioChuan" />
                        </Form.Item>
                        {/* <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDan.TrangThai} onChange={handleOnchange} name="TrangThai" />
                        </Form.Item> */}


                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!'}]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCM} maxCount={1}>
                                <Button style={{ background: '#6699CC' }} >File chứng minh</Button>
                                {stateTaiHuongDan?.FileCM && (
                                    <img src={stateTaiHuongDan?.FileCM} style={{
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


            <DrawerComponent title='Cập nhật chi tiết tải hướng dẫn' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateTaiHuongDan}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Hình thức hướng dẫn"
                            name="HinhThucHuongDan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* // <InputComponent value={stateTaiHuongDanDetails['HinhThucHuongDan']} onChange={handleOnchangeDetails} name="HinhThucHuongDan" /> */}
                            <Select
                                name="HinhThucHuongDan"
                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allHinhThucHuongdan?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Học viên"
                            name="HocVien"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails['HocVien']} onChange={handleOnchangeDetails} name="HocVien" />
                        </Form.Item>
                        <Form.Item
                            label="Lớp"
                            name="Lop"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.Lop} onChange={handleOnchangeDetails} name="Lop" />
                        </Form.Item>
                        <Form.Item
                            label="Đề tài"
                            name="DeTai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.DeTai} onChange={handleOnchangeDetails} name="DeTai" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày bắt đầu"
                            //  name="NgayBatDau"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiHuongDanDetails.NgayBatDau} onChange={handleOnchangeDetails} name="NgayBatDau" /> */}
                            <DatePicker
                                value={NgayBD}
                                onChange={handleOnchangeDetailNgayBD} name="NgayBatDau"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Quý"
                            name="Quy"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.Quy} onChange={handleOnchangeDetails} name="Quy" />
                        </Form.Item>
                        <Form.Item
                            label="Năm"
                            name="Nam"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.Nam} onChange={handleOnchangeDetails} name="Nam" />
                        </Form.Item>
                        <Form.Item
                            label="Số CB hướng dẫn"
                            name="SoCBHuongDan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.SoCBHuongDan} onChange={handleOnchangeDetails} name="SoCBHuongDan" />
                        </Form.Item>
                        <Form.Item
                            label="Định mức"
                            name="DinhMuc"
                        //    rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.DinhMuc} onChange={handleOnchangeDetails} name="DinhMuc" />
                        </Form.Item>
                        <Form.Item
                            label="Số giờ chuẩn"
                            name="SoGioChuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.SoGioChuan} onChange={handleOnchangeDetails} name="SoGioChuan" />
                        </Form.Item>
                        {/* <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiHuongDanDetails.TrangThai} onChange={handleOnchangeDetails} name="TrangThai" />
                        </Form.Item> */}
                        <Form.Item
                            label="File chứng minh"
                            name="FileCM"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeFileCMDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateTaiHuongDanDetails?.FileCM && (
                                    <img src={stateTaiHuongDanDetails?.FileCM} style={{
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
            <ModalComponent title="Xóa tải hướng dẫn" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTaiHuongDan}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tải hướng dẫn này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Phê quyệt tải hướng dẫn" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt tải hướng dẫn này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin tải hướng dẫn" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại tải hướng dẫn này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TaiHuongDan;
