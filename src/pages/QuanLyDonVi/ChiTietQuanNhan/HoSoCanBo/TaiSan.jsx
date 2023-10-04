
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64, renderOptions } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as TaiSanService from '../../../services/TaiSanService';
import * as LoaiTaiSanService from '../../../services/LoaiTaiSanService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const TaiSan = ({ }) => {

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
        TenTaiSan: '',
        LoaiTaiSan: '',
        GiaTri: '',
        DienTich: '',
        HoatDongKinhTe: '',
        TrangThai: '',
        GhiChu: '',



    })
    const [stateTaiSan, setStateTaiSan] = useState(inittial())
    const [stateTaiSanDetails, setStateTaiSanDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId
                , TenTaiSan,
                GiaTri, LoaiTaiSan, DienTich, HoatDongKinhTe,
                TrangThai = 0,
                GhiChu } = data
            const res = TaiSanService.createTaiSan({
                QuanNhanId, TenTaiSan,
                GiaTri, LoaiTaiSan, DienTich, HoatDongKinhTe,
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
            const res = TaiSanService.updateTaiSan(
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
            const res = TaiSanService.updateTaiSan(id, token, updatedData);
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
            const res = TaiSanService.updateTaiSan(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = TaiSanService.deleteTaiSan(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = TaiSanService.deleteManyTaiSan(
                ids,
                token)
            return res
        },
    )


    const getAllTaiSans = async () => {
        const res = await TaiSanService.getAllTaiSan()
        return res
    }

    // show


    const fetchGetTaiSan = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await TaiSanService.getTaiSanByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateTaiSanDetails({
                    TenTaiSan: res?.data.TenTaiSan,
                    GiaTri: res?.data.GiaTri,
                    LoaiTaiSan: res?.data.LoaiTaiSan,

                    DienTich: res?.data.DienTich,
                    HoatDongKinhTe: res?.data.HoatDongKinhTe,

                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateTaiSanDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiSanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiSanDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsTaiSan(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsTaiSan = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyTaiSans = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                quatrinhtaisanDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai


    const queryTaiSan = useQuery({ queryKey: ['taisans'], queryFn: getAllTaiSans })
    const quatrinhtaisanDetails = useQuery(['hosoquannhantaisan', quannhanId], fetchGetTaiSan, { enabled: !!quannhanId })
    console.log("qt tài sản:", quatrinhtaisanDetails.data, queryTaiSan.data)
    const { isLoading: isLoadingTaiSan, data: quatrinhtaisans } = queryTaiSan
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsTaiSan} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsTaiSan = async (rowSelected) => {
        const res = await TaiSanService.getDetailsTaiSan(rowSelected)
        if (res?.data) {
            setStateTaiSanDetails({
                TenTaiSan: res?.data.TenTaiSan,
                GiaTri: res?.data.GiaTri,
                LoaiTaiSan: res?.data.LoaiTaiSan,

                DienTich: res?.data.DienTich,
                HoatDongKinhTe: res?.data.HoatDongKinhTe,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsTaiSan(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateTaiSanDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateTaiSanDetails, isModalOpen])





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

    //const { data: quatrinhtaisanDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetTaiSan, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", quatrinhtaisanDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Tên tài sản',
            dataIndex: 'TenTaiSan',
            key: 'TenTaiSan',
        },

        {
            title: 'Loại tài sản',
            dataIndex: 'LoaiTaiSan',
            key: 'LoaiTaiSan',
        },

        {
            title: 'Diện tích',
            dataIndex: 'DienTich',
            key: 'DienTich',
        },

        {
            title: 'Giá trị',
            dataIndex: 'GiaTri',
            key: 'GiaTri',
        },
        {
            title: 'Hoạt động kinh tế',
            dataIndex: 'HoatDongKinhTe',
            key: 'HoatDongKinhTe',
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
        setStateTaiSanDetails({
            TenTaiSan: '',
            GiaTri: '',
            LoaiTaiSan: '',

            DienTich: '',
            HoatDongKinhTe: '',
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


    const handleDeleteTaiSan = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                quatrinhtaisanDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateTaiSan({
            TenTaiSan: '',
            GiaTri: '',
            LoaiTaiSan: '',

            DienTich: '',
            HoatDongKinhTe: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            TenTaiSan: stateTaiSan.TenTaiSan,
            GiaTri: stateTaiSan.GiaTri,
            LoaiTaiSan: stateTaiSan.LoaiTaiSan,

            DienTich: stateTaiSan.DienTich,
            HoatDongKinhTe: stateTaiSan.HoatDongKinhTe,
            //   TrangThai: stateTaiSan.TrangThai,
            GhiChu: stateTaiSan.GhiChu,
        }
        console.log("Finsh", stateTaiSan)
        mutation.mutate(params, {
            onSettled: () => {
                quatrinhtaisanDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateTaiSan({
            ...stateTaiSan,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateTaiSanDetails({
            ...stateTaiSanDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateTaiSan = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiSanDetails }, {
            onSettled: () => {
                quatrinhtaisanDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiSanDetails }, {
            onSettled: () => {
                quatrinhtaisanDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateTaiSanDetails }, {
            onSettled: () => {
                quatrinhtaisanDetails.refetch()
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
    const dataTable = quatrinhtaisanDetails?.data?.length && quatrinhtaisanDetails?.data?.map((quatrinhtaisanDetails) => {
        return {
            ...quatrinhtaisanDetails,
            key: quatrinhtaisanDetails._id,
            TrangThai: getTrangThaiText(quatrinhtaisanDetails.TrangThai),
            GiaTri: convertDateToString(quatrinhtaisanDetails.GiaTri)

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

    const fetchAllLoaiTaiSan = async () => {
        const res = await LoaiTaiSanService.getAllType()
        return res
    }

    const allTaiSan = useQuery({ queryKey: ['all-taisan'], queryFn: fetchAllLoaiTaiSan })
    const handleChangeSelect1 = (value) => {
        setStateTaiSan({
            ...stateTaiSan,
            LoaiTaiSan: value
        })
        // console.log(stateQuanNhan)
    }

    const handleChangeSelectDetails = (value) => {
        setStateTaiSanDetails({
            ...stateTaiSanDetails,
            LoaiTaiSan: value
        })
        // console.log(stateQuanNhan)
    }
    return (
        <div>
            <div>
                <WrapperHeader>Kê khai tài sản</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={quatrinhtaisanDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingTaiSan} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới tài sản" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Tên tài sản"
                            name="TenTaiSan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateTaiSan['TenTaiSan']}
                                onChange={handleOnchange}
                                name="TenTaiSan"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Loại tài sản"
                            name="LoaiTaiSan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                style={{ width: '100%' }}

                value={stateTaiSan['LoaiTaiSan']}
                onChange={handleOnchange}
                name="LoaiTaiSan"
              /> */}
                            <Select
                                name="LoaiTaiSan"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allTaiSan?.data?.data)}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Diện tích"
                            name="DienTich"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateTaiSan['DienTich']}
                                onChange={handleOnchange}
                                name="DienTich"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giá trị"
                            name="GiaTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateTaiSan['GiaTri']}
                                onChange={handleOnchange}
                                name="GiaTri"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hoạt động kinh tế"
                            name="HoatDongKinhTe"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateTaiSan['HoatDongKinhTe']}
                                onChange={handleOnchange}
                                name="HoatDongKinhTe"
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


            <DrawerComponent title='Chi tiết  tài sản' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateTaiSan}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên tài sản"
                            name="TenTaiSan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiSanDetails['TenTaiSan']} onChange={handleOnchangeDetails} name="TenTaiSan" />
                        </Form.Item>


                        <Form.Item
                            label="Loại tài sản"
                            name="LoaiTaiSan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateTaiSanDetails['LoaiTaiSan']} onChange={handleOnchangeDetails} name="LoaiTaiSan" />
            */}
                            <Select
                                name="LoaiTaiSan"
                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allTaiSan?.data?.data)}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Diện tích"
                            name="DienTich"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiSanDetails['DienTich']} onChange={handleOnchangeDetails} name="DienTich" />
                        </Form.Item>




                        <Form.Item
                            label="Giá trị"
                            name="GiaTri"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiSanDetails['GiaTri']} onChange={handleOnchangeDetails} name="GiaTri" />
                        </Form.Item>


                        <Form.Item
                            label="Hoạt động kinh tế"
                            name="HoatDongKinhTe"
                        //  rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateTaiSanDetails['HoatDongKinhTe']} onChange={handleOnchangeDetails} name="HoatDongKinhTe" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa  tài sản" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTaiSan}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa  tài sản này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt  tài sản" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt  tài sản này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin  tài sản" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại   tài sản này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default TaiSan;
