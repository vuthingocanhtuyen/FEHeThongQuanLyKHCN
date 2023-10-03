
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64, renderOptions } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as ThanNhanService from '../../../services/ThanNhanService';
import * as LoaiQuanHeService from '../../../services/LoaiQuanHeService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const ThanNhan = ({ }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false)
    const [isModalOpenNhapLai, setIsModalOpenNhapLai] = useState(false)

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        LoaiQuanHe: '',
        HoTen: '',
        QueQuan: '',
        NamSinh: '',

        NgheNghiep: '',
        SoDienThoai: '',
        NoiCongTac: '',
        ChucVu: '',

        TrangThai: '',
        GhiChu: '',

    })
    const [stateThanNhan, setStateThanNhan] = useState(inittial())
    const [stateThanNhanDetails, setStateThanNhanDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId
                , LoaiQuanHe,
                HoTen, QueQuan, NamSinh, NgheNghiep, SoDienThoai,
                NoiCongTac,
                ChucVu,
                TrangThai = 0,
                GhiChu } = data
            const res = ThanNhanService.createThanNhan({
                QuanNhanId, LoaiQuanHe,
                HoTen, QueQuan, NamSinh, NgheNghiep, SoDienThoai,
                NoiCongTac,
                ChucVu,
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
            const res = ThanNhanService.updateThanNhan(
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
            const res = ThanNhanService.updateThanNhan(id, token, updatedData);
            return res;

        },

    )


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
            const res = ThanNhanService.updateThanNhan(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = ThanNhanService.deleteThanNhan(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = ThanNhanService.deleteManyThanNhan(
                ids,
                token)
            return res
        },
    )


    const getAllThanNhans = async () => {
        const res = await ThanNhanService.getAllThanNhan()
        return res
    }

    // show


    const fetchGetThanNhan = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await ThanNhanService.getThanNhanByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateThanNhanDetails({
                    LoaiQuanHe: res?.data.LoaiQuanHe,
                    HoTen: res?.data.HoTen,
                    QueQuan: res?.data.QueQuan,

                    NamSinh: res?.data.NamSinh,
                    NgheNghiep: res?.data.NgheNghiep,
                    TrangThai: res?.data.TrangThai,
                    SoDienThoai: res?.data.SoDienThoai,
                    NoiCongTac: res?.data.NoiCongTac,
                    ChucVu: res?.data.ChucVu,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateThanNhanDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateThanNhanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateThanNhanDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsThanNhan(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsThanNhan = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyThanNhans = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                thannhanDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai


    const queryThanNhan = useQuery({ queryKey: ['thannhans'], queryFn: getAllThanNhans })
    const thannhanDetails = useQuery(['hosoquannhanthannhan', quannhanId], fetchGetThanNhan, { enabled: !!quannhanId })
    console.log("qt khen thưởng:", thannhanDetails.data, queryThanNhan.data)
    const { isLoading: isLoadingThanNhan, data: thannhans } = queryThanNhan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsThanNhan} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsThanNhan = async (rowSelected) => {
        const res = await ThanNhanService.getDetailsThanNhan(rowSelected)
        if (res?.data) {
            setStateThanNhanDetails({
                LoaiQuanHe: res?.data.LoaiQuanHe,
                HoTen: res?.data.HoTen,
                QueQuan: res?.data.QueQuan,

                NamSinh: res?.data.NamSinh,
                NgheNghiep: res?.data.NgheNghiep,
                SoDienThoai: res?.data.SoDienThoai,
                NoiCongTac: res?.data.NoiCongTac,
                ChucVu: res?.data.ChucVu,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsThanNhan(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateThanNhanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateThanNhanDetails, isModalOpen])





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

    //const { data: thannhanDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetThanNhan, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", thannhanDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Loại quan hệ',
            dataIndex: 'LoaiQuanHe',
            key: 'LoaiQuanHe',
        },
        {
            title: 'Họ tên thân nhân',
            dataIndex: 'HoTen',
            key: 'HoTen',
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'NgheNghiep',
            key: 'NgheNghiep',
        },
        {
            title: 'Quê quán',
            dataIndex: 'QueQuan',
            key: 'QueQuan',
        },

        {
            title: 'Năm sinh',
            dataIndex: 'NamSinh',
            key: 'NamSinh',
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'SoDienThoai',
            key: 'SoDienThoai',
        },
        {
            title: 'Nơi công tác',
            dataIndex: 'NoiCongTac',
            key: 'NoiCongTac',
        },

        {
            title: 'Chức vụ',
            dataIndex: 'ChucVu',
            key: 'ChucVu',
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
        setStateThanNhanDetails({
            LoaiQuanHe: '',
            HoTen: '',
            QueQuan: '',

            NamSinh: '',
            NgheNghiep: '',
            SoDienThoai: '',
            NoiCongTac: '',
            ChucVu: '',
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


    const handleDeleteThanNhan = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                thannhanDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateThanNhan({
            LoaiQuanHe: '',
            HoTen: '',
            QueQuan: '',

            NamSinh: '',
            NgheNghiep: '',
            SoDienThoai: '',
            NoiCongTac: '',
            ChucVu: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            LoaiQuanHe: stateThanNhan.LoaiQuanHe,
            HoTen: stateThanNhan.HoTen,
            QueQuan: stateThanNhan.QueQuan,

            NamSinh: stateThanNhan.NamSinh,
            NgheNghiep: stateThanNhan.NgheNghiep,
            SoDienThoai: stateThanNhan.SoDienThoai,
            NoiCongTac: stateThanNhan.NoiCongTac,
            ChucVu: stateThanNhan.ChucVu,
            //   TrangThai: stateThanNhan.TrangThai,
            GhiChu: stateThanNhan.GhiChu,
        }
        console.log("Finsh", stateThanNhan)
        mutation.mutate(params, {
            onSettled: () => {
                thannhanDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateThanNhan({
            ...stateThanNhan,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateThanNhanDetails({
            ...stateThanNhanDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateThanNhan = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateThanNhanDetails }, {
            onSettled: () => {
                thannhanDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateThanNhanDetails }, {
            onSettled: () => {
                thannhanDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateThanNhanDetails }, {
            onSettled: () => {
                thannhanDetails.refetch()
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

    function convertDateToString(date) {
        // Sử dụng Moment.js để chuyển đổi đối tượng Date thành chuỗi theo định dạng mong muốn
        return moment(date).format('DD/MM/YYYY');
    }
    const dataTable = thannhanDetails?.data?.length && thannhanDetails?.data?.map((thannhanDetails) => {
        return {
            ...thannhanDetails,
            key: thannhanDetails._id,
            TrangThai: getTrangThaiText(thannhanDetails.TrangThai),
            NamSinh: convertDateToString(thannhanDetails.NamSinh)

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

    const fetchAllQuanHe = async () => {
        const res = await LoaiQuanHeService.getAllType()
        return res
    }

    const allQuanHe = useQuery({ queryKey: ['all-quanhe'], queryFn: fetchAllQuanHe })
    const handleChangeSelect1 = (value) => {
        setStateThanNhan({
            ...stateThanNhan,
            LoaiQuanHe: value
        })
        // console.log(stateQuanNhan)
    }

    const handleChangeSelectDetails = (value) => {
        setStateThanNhanDetails({
            ...stateThanNhanDetails,
            LoaiQuanHe: value
        })
        // console.log(stateQuanNhan)
    }
    return (
        <div>
            <div>
                <WrapperHeader>Thân nhân</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={thannhanDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingThanNhan} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới thân nhân" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Loại quan hệ"
                            name="LoaiQuanHe"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="LoaiQuanHe"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allQuanHe?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Họ tên thân nhân"
                            name="HoTen"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhan['HoTen']}
                                onChange={handleOnchange}
                                name="HoTen"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nghề nghiệp"
                            name="NgheNghiep"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhan['NgheNghiep']}
                                onChange={handleOnchange}
                                name="NgheNghiep"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Quê quán"
                            name="QueQuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhan['QueQuan']}
                                onChange={handleOnchange}
                                name="QueQuan"
                            />

                        </Form.Item>


                        <Form.Item
                            label="Năm sinh"
                            name="NamSinh"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhan['NamSinh']}
                                onChange={handleOnchange}
                                name="NamSinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="SoDienThoai"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhan['SoDienThoai']}
                                onChange={handleOnchange}
                                name="SoDienThoai"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nơi làm việc"
                            name="NoiCongTac"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhan.NoiCongTac}
                                onChange={handleOnchange}
                                name="NoiCongTac"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Chức vụ"
                            name="ChucVu"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhan['ChucVu']}
                                onChange={handleOnchange}
                                name="ChucVu"
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


            <DrawerComponent title='Chi tiết thân nhân' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateThanNhan}
                        autoComplete="on"
                        form={form}
                    >

                        <Form.Item
                            label="Loại quan hệ"
                            name="LoaiQuanHe"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <Select
                                name="LoaiQuanHe"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allQuanHe?.data?.data)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Họ tên thân nhân"
                            name="HoTen"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhanDetails['HoTen']}
                                onChange={handleOnchangeDetails}
                                name="HoTen"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nghề nghiệp"
                            name="NgheNghiep"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhanDetails['NgheNghiep']}
                                onChange={handleOnchangeDetails}
                                name="NgheNghiep"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Quê quán"
                            name="QueQuan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhanDetails['QueQuan']}
                                onChange={handleOnchangeDetails}
                                name="QueQuan"
                            />

                        </Form.Item>


                        <Form.Item
                            label="Năm sinh"
                            name="NamSinh"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhanDetails['NamSinh']}
                                onChange={handleOnchangeDetails}
                                name="NamSinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="SoDienThoai"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhanDetails['SoDienThoai']}
                                onChange={handleOnchangeDetails}
                                name="SoDienThoai"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nơi làm việc"
                            name="NoiCongTac"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhanDetails['NoiCongTac']}
                                onChange={handleOnchangeDetails}
                                name="NoiCongTac"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Chức vụ"
                            name="ChucVu"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateThanNhanDetails['ChucVu']}
                                onChange={handleOnchangeDetails}
                                name="ChucVu"
                            />
                        </Form.Item>




                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa thân nhân" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteThanNhan}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa thân nhân này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt thân nhân" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt thân nhân này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin thân nhân" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  thân nhân này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default ThanNhan;
