
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../../components/Message/Message'
import { getBase64, renderOptions } from '../../../../utils'
import Loading from '../../../../components/LoadingComponent/Loading'
import InputComponent from '../../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../../hooks/useMutationHook'
import * as QuaTrinhKhenThuongService from '../../../../services/QuaTrinhKhenThuongService';
import * as DanhMucKhenThuongService from '../../../../services/DanhMucKhenThuongService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QuaTrinhKhenThuong = ({ }) => {

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
        SoQuyetDinh: '',
        NgayQuyetDinh: '',
        LoaiKhenThuong: '',
        CapKhenThuong: '',
        TrangThai: '',
        GhiChu: '',
        TenQuyetDinh: '',
    })
    const [stateQuaTrinhKhenThuong, setStateQuaTrinhKhenThuong] = useState(inittial())
    const [stateQuaTrinhKhenThuongDetails, setStateQuaTrinhKhenThuongDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId
                , SoQuyetDinh,
                NgayQuyetDinh, LoaiKhenThuong, CapKhenThuong, TenQuyetDinh,
                TrangThai = 0,
                GhiChu } = data
            const res = QuaTrinhKhenThuongService.createQuaTrinhKhenThuong({
                QuanNhanId, SoQuyetDinh,
                NgayQuyetDinh, LoaiKhenThuong, CapKhenThuong, TenQuyetDinh,
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
            const res = QuaTrinhKhenThuongService.updateQuaTrinhKhenThuong(
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
            const res = QuaTrinhKhenThuongService.updateQuaTrinhKhenThuong(id, token, updatedData);
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
            const res = QuaTrinhKhenThuongService.updateQuaTrinhKhenThuong(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = QuaTrinhKhenThuongService.deleteQuaTrinhKhenThuong(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QuaTrinhKhenThuongService.deleteManyQuaTrinhKhenThuong(
                ids,
                token)
            return res
        },
    )


    const getAllQuaTrinhKhenThuongs = async () => {
        const res = await QuaTrinhKhenThuongService.getAllQuaTrinhKhenThuong()
        return res
    }

    // show


    const fetchGetQuaTrinhKhenThuong = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await QuaTrinhKhenThuongService.getQuaTrinhKhenThuongByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQuaTrinhKhenThuongDetails({
                    SoQuyetDinh: res?.data.SoQuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    LoaiKhenThuong: res?.data.LoaiKhenThuong,

                    CapKhenThuong: res?.data.CapKhenThuong,
                    TenQuyetDinh: res?.data.TenQuyetDinh,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQuaTrinhKhenThuongDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhKhenThuongDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhKhenThuongDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQuaTrinhKhenThuong(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQuaTrinhKhenThuong = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQuaTrinhKhenThuongs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                quatrinhkhenthuongDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai


    const queryQuaTrinhKhenThuong = useQuery({ queryKey: ['quatrinhkhenthuongs'], queryFn: getAllQuaTrinhKhenThuongs })
    const quatrinhkhenthuongDetails = useQuery(['hosoquannhankhenthuong', quannhanId], fetchGetQuaTrinhKhenThuong, { enabled: !!quannhanId })
    console.log("qt khen thưởng:", quatrinhkhenthuongDetails.data, queryQuaTrinhKhenThuong.data)
    const { isLoading: isLoadingQuaTrinhKhenThuong, data: quatrinhkhenthuongs } = queryQuaTrinhKhenThuong
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuaTrinhKhenThuong} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsQuaTrinhKhenThuong = async (rowSelected) => {
        const res = await QuaTrinhKhenThuongService.getDetailsQuaTrinhKhenThuong(rowSelected)
        if (res?.data) {
            setStateQuaTrinhKhenThuongDetails({
                SoQuyetDinh: res?.data.SoQuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                LoaiKhenThuong: res?.data.LoaiKhenThuong,

                CapKhenThuong: res?.data.CapKhenThuong,
                TenQuyetDinh: res?.data.TenQuyetDinh,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQuaTrinhKhenThuong(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhKhenThuongDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhKhenThuongDetails, isModalOpen])





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

    //const { data: quatrinhkhenthuongDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuaTrinhKhenThuong, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", quatrinhkhenthuongDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },
        {
            title: 'Số quyết định',
            dataIndex: 'SoQuyetDinh',
            key: 'SoQuyetDinh',
        },
        {
            title: 'Ngày quyết định',
            dataIndex: 'NgayQuyetDinh',
            key: 'NgayQuyetDinh',
        },
        {
            title: 'Tên quyết định',
            dataIndex: 'TenQuyetDinh',
            key: 'TenQuyetDinh',
        },
        {
            title: 'Loại khen thưởng',
            dataIndex: 'LoaiKhenThuong',
            key: 'LoaiKhenThuong',
        },

        {
            title: 'Cấp khen thưởng',
            dataIndex: 'CapKhenThuong',
            key: 'CapKhenThuong',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'TrangThai',
            key: 'TrangThai',
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
        setStateQuaTrinhKhenThuongDetails({
            SoQuyetDinh: '',
            NgayQuyetDinh: '',
            LoaiKhenThuong: '',

            CapKhenThuong: '',
            TenQuyetDinh: '',
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


    const handleDeleteQuaTrinhKhenThuong = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                quatrinhkhenthuongDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQuaTrinhKhenThuong({
            SoQuyetDinh: '',
            NgayQuyetDinh: '',
            LoaiKhenThuong: '',

            CapKhenThuong: '',
            TenQuyetDinh: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            SoQuyetDinh: stateQuaTrinhKhenThuong.SoQuyetDinh,
            NgayQuyetDinh: stateQuaTrinhKhenThuong.NgayQuyetDinh,
            LoaiKhenThuong: stateQuaTrinhKhenThuong.LoaiKhenThuong,

            CapKhenThuong: stateQuaTrinhKhenThuong.CapKhenThuong,
            TenQuyetDinh: stateQuaTrinhKhenThuong.TenQuyetDinh,
            //   TrangThai: stateQuaTrinhKhenThuong.TrangThai,
            GhiChu: stateQuaTrinhKhenThuong.GhiChu,
        }
        console.log("Finsh", stateQuaTrinhKhenThuong)
        mutation.mutate(params, {
            onSettled: () => {
                quatrinhkhenthuongDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhKhenThuong({
            ...stateQuaTrinhKhenThuong,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQuaTrinhKhenThuongDetails({
            ...stateQuaTrinhKhenThuongDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateQuaTrinhKhenThuong = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhKhenThuongDetails }, {
            onSettled: () => {
                quatrinhkhenthuongDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhKhenThuongDetails }, {
            onSettled: () => {
                quatrinhkhenthuongDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhKhenThuongDetails }, {
            onSettled: () => {
                quatrinhkhenthuongDetails.refetch()
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
    const dataTable = quatrinhkhenthuongDetails?.data?.length && quatrinhkhenthuongDetails?.data?.map((quatrinhkhenthuongDetails) => {
        return {
            ...quatrinhkhenthuongDetails,
            key: quatrinhkhenthuongDetails._id,
            TrangThai: getTrangThaiText(quatrinhkhenthuongDetails.TrangThai),
            NgayQuyetDinh: convertDateToString(quatrinhkhenthuongDetails.NgayQuyetDinh)

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

    const fetchAllLoaiKhenThuong = async () => {
        const res = await DanhMucKhenThuongService.getAllType()
        return res
    }

    const allKhenThuong = useQuery({ queryKey: ['all-khenthuong'], queryFn: fetchAllLoaiKhenThuong })
    const handleChangeSelect1 = (value) => {
        setStateQuaTrinhKhenThuong({
            ...stateQuaTrinhKhenThuong,
            LoaiKhenThuong: value
        })
        // console.log(stateQuanNhan)
    }

    const handleChangeSelectDetails = (value) => {
        setStateQuaTrinhKhenThuongDetails({
            ...stateQuaTrinhKhenThuongDetails,
            LoaiKhenThuong: value
        })
        // console.log(stateQuanNhan)
    }
    return (
        <div>
            <div>
                <WrapperHeader>Quá trình khen thưởng</WrapperHeader>
                {/* <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div> */}
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={quatrinhkhenthuongDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQuaTrinhKhenThuong} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới quá trình khen thưởng" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Số quyết định"
                            name="SoQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhKhenThuong['SoQuyetDinh']}
                                onChange={handleOnchange}
                                name="SoQuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tên quyết định"
                            name="TenQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhKhenThuong['TenQuyetDinh']}
                                onChange={handleOnchange}
                                name="TenQuyetDinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhKhenThuong['NgayQuyetDinh']}
                                onChange={handleOnchange}
                                name="NgayQuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Loại khen thưởng"
                            name="LoaiKhenThuong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhKhenThuong['LoaiKhenThuong']}
                onChange={handleOnchange}
                name="LoaiKhenThuong"
              /> */}
                            <Select
                                name="LoaiKhenThuong"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allKhenThuong?.data?.data)}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Cấp khen thưởng"
                            name="CapKhenThuong"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhKhenThuong['CapKhenThuong']}
                                onChange={handleOnchange}
                                name="CapKhenThuong"
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


            <DrawerComponent title='Chi tiết quá trình khen thưởng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQuaTrinhKhenThuong}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Số quyết định"
                            name="SoQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKhenThuongDetails['SoQuyetDinh']} onChange={handleOnchangeDetails} name="SoQuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Tên quyết định"
                            name="TenQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKhenThuongDetails['TenQuyetDinh']} onChange={handleOnchangeDetails} name="TenQuyetDinh" />
                        </Form.Item>


                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKhenThuongDetails['NgayQuyetDinh']} onChange={handleOnchangeDetails} name="NgayQuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Loại khen thưởng"
                            name="LoaiKhenThuong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateQuaTrinhKhenThuongDetails['LoaiKhenThuong']} onChange={handleOnchangeDetails} name="LoaiKhenThuong" />
            */}
                            <Select
                                name="LoaiKhenThuong"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allKhenThuong?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Cấp khen thưởng"
                            name="CapKhenThuong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKhenThuongDetails['CapKhenThuong']} onChange={handleOnchangeDetails} name="DonVi" />
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình khen thưởng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuaTrinhKhenThuong}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình khen thưởng này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt quá trình khen thưởng" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt quá trình khen thưởng này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin quá trình khen thưởng" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  quá trình khen thưởng này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QuaTrinhKhenThuong;
