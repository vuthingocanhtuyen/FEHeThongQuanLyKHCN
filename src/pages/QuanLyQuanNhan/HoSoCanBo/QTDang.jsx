
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { renderOptions } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as QTCTDangService from '../../../services/QTCTDangService';
import * as DanhMucChucVuDangService from '../../../services/DanhMucChucVuDangService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QTDang = ({ }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)
    const [NgayQD, setNgayQD] = useState('');
    const [NgayKT, setNgayKT] = useState('');
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        QuyetDinh: '',
        NgayQuyetDinh: moment(),
        ChucVu: '',
        DonVi: '',
        KetThuc: moment(),
        TrangThai: '',
        GhiChu: '',
    })
    const [stateQTCTDang, setStateQTCTDang] = useState(inittial())
    const [stateQTCTDangDetails, setStateQTCTDangDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId, code = 123
                , QuyetDinh,
                NgayQuyetDinh, ChucVu, DonVi, KetThuc,
                TrangThai = 0,
                GhiChu } = data
            const res = QTCTDangService.createQTCTDang({
                QuanNhanId, code, QuyetDinh,
                NgayQuyetDinh, ChucVu, DonVi, KetThuc,
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
            const res = QTCTDangService.updateQTCTDang(
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
            const res = QTCTDangService.updateQTCTDang(id, token, updatedData);
            return res;

        },

    )

    // ngày quyết định
    useEffect(() => {
        setNgayQD(moment(stateQTCTDangDetails['NgayQuyetDinh']));
        // setNgayQD(convertDateToString(stateQTCTDangDetails['NgayQuyetDinh']));
    }, [form, stateQTCTDangDetails, isOpenDrawer])

    const handleOnchangeDetailNgayQD = (date) => {
        setStateQTCTDangDetails({
            ...stateQTCTDangDetails,
            NgayQuyetDinh: date
        })
    }
    const handleOnchangeNgayQD = (date) => {
        setStateQTCTDang({
            ...stateQTCTDang,
            NgayQuyetDinh: date
        })
    }
    // ngày kết thúc
    useEffect(() => {
        setNgayKT(moment(stateQTCTDangDetails['KetThuc']));
        // setNgayQD(convertDateToString(stateQTCTDangDetails['NgayQuyetDinh']));
    }, [form, stateQTCTDangDetails, isOpenDrawer])

    const handleOnchangeDetailNgayKT = (date) => {
        setStateQTCTDangDetails({
            ...stateQTCTDangDetails,
            KetThuc: date
        })
    }
    const handleOnchangeNgayKT = (date) => {
        setStateQTCTDang({
            ...stateQTCTDang,
            KetThuc: date
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
            const res = QTCTDangService.updateQTCTDang(id, token, updatedData);
            return res;

        },

    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = QTCTDangService.deleteQTCTDang(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QTCTDangService.deleteManyQTCTDang(
                ids,
                token)
            return res
        },
    )


    const getAllQTCTDangs = async () => {
        const res = await QTCTDangService.getAllQTCTDang()
        return res
    }

    // show


    const fetchGetQTCTDang = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await QTCTDangService.getQTCTDangByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQTCTDangDetails({
                    QuyetDinh: res?.data.QuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    ChucVu: res?.data.ChucVu,
                    DonVi: res?.data.DonVi,
                    KetThuc: res?.data.KetThuc,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQTCTDangDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQTCTDangDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQTCTDangDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQTCTDang(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQTCTDang = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQTCTDangs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                quatrinhDangDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai


    const queryQTCTDang = useQuery({ queryKey: ['ctdangs'], queryFn: getAllQTCTDangs })
    const quatrinhDangDetails = useQuery(['hosoquannhandang', quannhanId], fetchGetQTCTDang, { enabled: !!quannhanId })
    console.log("qt công tác:", quatrinhDangDetails.data, queryQTCTDang.data)
    const { isLoading: isLoadingQTCTDang, data: ctdangs } = queryQTCTDang
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQTCTDang} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsQTCTDang = async (rowSelected) => {
        const res = await QTCTDangService.getDetailsQTCTDang(rowSelected)
        if (res?.data) {
            setStateQTCTDangDetails({
                QuyetDinh: res?.data.QuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                ChucVu: res?.data.ChucVu,
                DonVi: res?.data.DonVi,
                KetThuc: res?.data.KetThuc,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQTCTDang(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQTCTDangDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQTCTDangDetails, isModalOpen])





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


    //Show dữ liệu

    //const { data: quatrinhDangDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQTCTDang, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", quatrinhDangDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Số quyết định',
            dataIndex: 'QuyetDinh',
            key: 'QuyetDinh',
        },
        {
            title: 'Ngày quyết định',
            dataIndex: 'NgayQuyetDinh',
            key: 'NgayQuyetDinh',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'ChucVu',
            key: 'ChucVu',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'DonVi',
            key: 'DonVi',
        },
        {
            title: 'Kết thúc',
            dataIndex: 'KetThuc',
            key: 'KetThuc',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'GhiChu',
            key: 'GhiChu',
        },
        // {
        //     title: 'Chức năng',
        //     dataIndex: 'action',
        //     render: renderAction
        // },


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
        setStateQTCTDangDetails({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            ChucVu: '',
            DonVi: '',
            KetThuc: '',
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


    const handleDeleteQTCTDang = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                quatrinhDangDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQTCTDang({
            QuyetDinh: '',
            NgayQuyetDinh: '',
            ChucVu: '',
            DonVi: '',
            KetThuc: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            QuyetDinh: stateQTCTDang.QuyetDinh,
            NgayQuyetDinh: stateQTCTDang.NgayQuyetDinh,
            ChucVu: stateQTCTDang.ChucVu,
            DonVi: stateQTCTDang.DonVi,
            KetThuc: stateQTCTDang.KetThuc,
            //   TrangThai: stateQTCTDang.TrangThai,
            GhiChu: stateQTCTDang.GhiChu,
        }
        console.log("Finsh", stateQTCTDang)
        mutation.mutate(params, {
            onSettled: () => {
                quatrinhDangDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQTCTDang({
            ...stateQTCTDang,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQTCTDangDetails({
            ...stateQTCTDangDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateQTCTDang = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQTCTDangDetails }, {
            onSettled: () => {
                quatrinhDangDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateQTCTDangDetails }, {
            onSettled: () => {
                quatrinhDangDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateQTCTDangDetails }, {
            onSettled: () => {
                quatrinhDangDetails.refetch()
            }

        })
    }
    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
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

    const dataTable = quatrinhDangDetails?.data?.length && quatrinhDangDetails?.data?.map((quatrinhDangDetails) => {
        return {
            ...quatrinhDangDetails,
            key: quatrinhDangDetails._id,
            TrangThai: getTrangThaiText(quatrinhDangDetails.TrangThai),
            NgayQuyetDinh: convertDateToString(quatrinhDangDetails.NgayQuyetDinh)
        }
    })
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])


    const fetchAllCVDang = async () => {
        const res = await DanhMucChucVuDangService.getAllType()
        return res
    }

    const allCVDang = useQuery({ queryKey: ['all-cvdang'], queryFn: fetchAllCVDang })
    const handleChangeSelect1 = (value) => {
        setStateQTCTDang({
            ...stateQTCTDang,
            ChucVu: value
        })
        // console.log(stateQuanNhan)
    }

    const handleChangeSelectDetails = (value) => {
        setStateQTCTDangDetails({
            ...stateQTCTDangDetails,
            ChucVu: value
        })
        // console.log(stateQuanNhan)
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


    return (
        <div>
            <div>
                <WrapperHeader>Quá trình sinh hoạt Đảng</WrapperHeader>
                {/* <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div> */}
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={quatrinhDangDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQTCTDang} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới quá trình sinh hoạt Đảng" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >

                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCTDang['QuyetDinh']}
                                onChange={handleOnchange}
                                name="QuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            //     name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayQD} name="NgayQuyetDinh"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Chức vụ"
                            name="ChucVu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCTDang['ChucVu']}
                                onChange={handleOnchange}
                                name="ChucVu"
                            /> */}
                            <Select
                                name="ChucVu"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allCVDang?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Đơn vị"
                            name="DonVi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCTDang['DonVi']}
                                onChange={handleOnchange}
                                name="DonVi"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Kết thúc"
                        //     name="KetThuc"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                //  value={NgayQD}
                                onChange={handleOnchangeNgayKT} name="KetThuc"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>



                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQTCTDang['GhiChu']}
                                onChange={handleOnchange}
                                name="GhiChu"
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>


            <DrawerComponent title='Chi tiết quá trình sinh hoạt Đảng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQTCTDang}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Mã quyết định"
                            name="QuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQTCTDangDetails['QuyetDinh']} onChange={handleOnchangeDetails} name="QuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Ngày quyết định"
                            // name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayQD}
                                onChange={handleOnchangeDetailNgayQD} name="NgayQuyetDinh"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Chức vụ"
                            name="ChucVu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateQTCTDangDetails['ChucVu']} onChange={handleOnchangeDetails} name="ChucVu" /> */}
                            <Select
                                name="ChucVu"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allCVDang?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Đơn vị"
                            name="DonVi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQTCTDangDetails['DonVi']} onChange={handleOnchangeDetails} name="DonVi" />
                        </Form.Item>

                        <Form.Item
                            label="Kết thúc"
                        //   name="KetThuc"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <DatePicker
                                value={NgayKT}
                                onChange={handleOnchangeDetailNgayKT} name="KetThuc"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQTCTDangDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình sinh hoạt Đảng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQTCTDang}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình sinh hoạt Đảng này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Phê quyệtquá trình sinh hoạt Đảng" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt quá trình sinh hoạt Đảng này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin quá trình sinh hoạt Đảng" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  quá trình sinh hoạt Đảng này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QTDang;
