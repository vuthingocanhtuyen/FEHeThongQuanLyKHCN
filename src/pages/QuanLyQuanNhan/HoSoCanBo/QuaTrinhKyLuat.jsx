
import React, { useEffect, useState, useRef } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64, renderOptions } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as QuaTrinhKyLuatService from '../../../services/QuaTrinhKyLuatService';
import * as DanhMucKyLuatService from '../../../services/DanhMucKyLuatService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
import moment from 'moment';
const QuaTrinhKyLuat = ({ }) => {

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
        HinhThucKyLuat: '',
        CapKyLuat: '',
        TrangThai: '',
        GhiChu: '',
        TenQuyetDinh: '',
    })
    const [stateQuaTrinhKyLuat, setStateQuaTrinhKyLuat] = useState(inittial())
    const [stateQuaTrinhKyLuatDetails, setStateQuaTrinhKyLuatDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId
                , SoQuyetDinh,
                NgayQuyetDinh, HinhThucKyLuat, CapKyLuat, TenQuyetDinh,
                TrangThai = 0,
                GhiChu } = data
            const res = QuaTrinhKyLuatService.createQuaTrinhKyLuat({
                QuanNhanId, SoQuyetDinh,
                NgayQuyetDinh, HinhThucKyLuat, CapKyLuat, TenQuyetDinh,
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
            const res = QuaTrinhKyLuatService.updateQuaTrinhKyLuat(
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
            const res = QuaTrinhKyLuatService.updateQuaTrinhKyLuat(id, token, updatedData);
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
            const res = QuaTrinhKyLuatService.updateQuaTrinhKyLuat(id, token, updatedData);
            return res;

        },

    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = QuaTrinhKyLuatService.deleteQuaTrinhKyLuat(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = QuaTrinhKyLuatService.deleteManyQuaTrinhKyLuat(
                ids,
                token)
            return res
        },
    )


    const getAllQuaTrinhKyLuats = async () => {
        const res = await QuaTrinhKyLuatService.getAllQuaTrinhKyLuat()
        return res
    }

    // show


    const fetchGetQuaTrinhKyLuat = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await QuaTrinhKyLuatService.getQuaTrinhKyLuatByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateQuaTrinhKyLuatDetails({
                    SoQuyetDinh: res?.data.SoQuyetDinh,
                    NgayQuyetDinh: res?.data.NgayQuyetDinh,
                    HinhThucKyLuat: res?.data.HinhThucKyLuat,

                    CapKyLuat: res?.data.CapKyLuat,
                    TenQuyetDinh: res?.data.TenQuyetDinh,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateQuaTrinhKyLuatDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhKyLuatDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhKyLuatDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsQuaTrinhKyLuat(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsQuaTrinhKyLuat = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyQuaTrinhKyLuats = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                quatrinhkyluatDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai


    const queryQuaTrinhKyLuat = useQuery({ queryKey: ['quatrinhkyluats'], queryFn: getAllQuaTrinhKyLuats })
    const quatrinhkyluatDetails = useQuery(['hosoquannhankyluat', quannhanId], fetchGetQuaTrinhKyLuat, { enabled: !!quannhanId })
    console.log("qt kỷ luật:", quatrinhkyluatDetails.data, queryQuaTrinhKyLuat.data)
    const { isLoading: isLoadingQuaTrinhKyLuat, data: quatrinhkyluats } = queryQuaTrinhKyLuat
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsQuaTrinhKyLuat} />
                <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsQuaTrinhKyLuat = async (rowSelected) => {
        const res = await QuaTrinhKyLuatService.getDetailsQuaTrinhKyLuat(rowSelected)
        if (res?.data) {
            setStateQuaTrinhKyLuatDetails({
                SoQuyetDinh: res?.data.SoQuyetDinh,
                NgayQuyetDinh: res?.data.NgayQuyetDinh,
                HinhThucKyLuat: res?.data.HinhThucKyLuat,

                CapKyLuat: res?.data.CapKyLuat,
                TenQuyetDinh: res?.data.TenQuyetDinh,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsQuaTrinhKyLuat(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateQuaTrinhKyLuatDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateQuaTrinhKyLuatDetails, isModalOpen])





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

    //const { data: quatrinhkyluatDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetQuaTrinhKyLuat, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", quatrinhkyluatDetails)
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
            title: 'Hình thức kỷ luật',
            dataIndex: 'HinhThucKyLuat',
            key: 'HinhThucKyLuat',
        },

        {
            title: 'Cấp kỷ luật',
            dataIndex: 'CapKyLuat',
            key: 'CapKyLuat',
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
        setStateQuaTrinhKyLuatDetails({
            SoQuyetDinh: '',
            NgayQuyetDinh: '',
            HinhThucKyLuat: '',

            CapKyLuat: '',
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


    const handleDeleteQuaTrinhKyLuat = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                quatrinhkyluatDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateQuaTrinhKyLuat({
            SoQuyetDinh: '',
            NgayQuyetDinh: '',
            HinhThucKyLuat: '',

            CapKyLuat: '',
            TenQuyetDinh: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            SoQuyetDinh: stateQuaTrinhKyLuat.SoQuyetDinh,
            NgayQuyetDinh: stateQuaTrinhKyLuat.NgayQuyetDinh,
            HinhThucKyLuat: stateQuaTrinhKyLuat.HinhThucKyLuat,

            CapKyLuat: stateQuaTrinhKyLuat.CapKyLuat,
            TenQuyetDinh: stateQuaTrinhKyLuat.TenQuyetDinh,
            //   TrangThai: stateQuaTrinhKyLuat.TrangThai,
            GhiChu: stateQuaTrinhKyLuat.GhiChu,
        }
        console.log("Finsh", stateQuaTrinhKyLuat)
        mutation.mutate(params, {
            onSettled: () => {
                quatrinhkyluatDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateQuaTrinhKyLuat({
            ...stateQuaTrinhKyLuat,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateQuaTrinhKyLuatDetails({
            ...stateQuaTrinhKyLuatDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateQuaTrinhKyLuat = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhKyLuatDetails }, {
            onSettled: () => {
                quatrinhkyluatDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhKyLuatDetails }, {
            onSettled: () => {
                quatrinhkyluatDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateQuaTrinhKyLuatDetails }, {
            onSettled: () => {
                quatrinhkyluatDetails.refetch()
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
    const dataTable = quatrinhkyluatDetails?.data?.length && quatrinhkyluatDetails?.data?.map((quatrinhkyluatDetails) => {
        return {
            ...quatrinhkyluatDetails,
            key: quatrinhkyluatDetails._id,
            TrangThai: getTrangThaiText(quatrinhkyluatDetails.TrangThai),
            NgayQuyetDinh: convertDateToString(quatrinhkyluatDetails.NgayQuyetDinh)

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

    const fetchAllHinhThucKyLuat = async () => {
        const res = await DanhMucKyLuatService.getAllType()
        return res
    }

    const allKyLuat = useQuery({ queryKey: ['all-kyluat'], queryFn: fetchAllHinhThucKyLuat })
    const handleChangeSelect1 = (value) => {
        setStateQuaTrinhKyLuat({
            ...stateQuaTrinhKyLuat,
            HinhThucKyLuat: value
        })
        // console.log(stateQuanNhan)
    }

    const handleChangeSelectDetails = (value) => {
        setStateQuaTrinhKyLuatDetails({
            ...stateQuaTrinhKyLuatDetails,
            HinhThucKyLuat: value
        })
        // console.log(stateQuanNhan)
    }
    return (
        <div>
            <div>
                <WrapperHeader>Quá trình kỷ luật</WrapperHeader>
                {/* <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div> */}
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={quatrinhkyluatDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingQuaTrinhKyLuat} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới quá trình kỷ luật" open={isModalOpen} onCancel={handleCancel} footer={null}>
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

                                value={stateQuaTrinhKyLuat['SoQuyetDinh']}
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

                                value={stateQuaTrinhKyLuat['TenQuyetDinh']}
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

                                value={stateQuaTrinhKyLuat['NgayQuyetDinh']}
                                onChange={handleOnchange}
                                name="NgayQuyetDinh"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Hình thức kỷ luật"
                            name="HinhThucKyLuat"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent
                style={{ width: '100%' }}

                value={stateQuaTrinhKyLuat['HinhThucKyLuat']}
                onChange={handleOnchange}
                name="HinhThucKyLuat"
              /> */}
                            <Select
                                name="HinhThucKyLuat"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelect1}
                                options={renderOptions(allKyLuat?.data?.data)}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Cấp kỷ luật"
                            name="CapKyLuat"
                        //   rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateQuaTrinhKyLuat['CapKyLuat']}
                                onChange={handleOnchange}
                                name="CapKyLuat"
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


            <DrawerComponent title='Chi tiết quá trình kỷ luật' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateQuaTrinhKyLuat}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Số quyết định"
                            name="SoQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKyLuatDetails['SoQuyetDinh']} onChange={handleOnchangeDetails} name="SoQuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Tên quyết định"
                            name="TenQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKyLuatDetails['TenQuyetDinh']} onChange={handleOnchangeDetails} name="TenQuyetDinh" />
                        </Form.Item>


                        <Form.Item
                            label="Ngày quyết định"
                            name="NgayQuyetDinh"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKyLuatDetails['NgayQuyetDinh']} onChange={handleOnchangeDetails} name="NgayQuyetDinh" />
                        </Form.Item>

                        <Form.Item
                            label="Hình thức kỷ luật"
                            name="HinhThucKyLuat"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            {/* <InputComponent value={stateQuaTrinhKyLuatDetails['HinhThucKyLuat']} onChange={handleOnchangeDetails} name="HinhThucKyLuat" />
            */}
                            <Select
                                name="HinhThucKyLuat"
                                //value={stateTaiHuongDan['HinhThucHuongDan']}

                                onChange={handleChangeSelectDetails}
                                options={renderOptions(allKyLuat?.data?.data)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Đơn vị"
                            name="DonVi"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateQuaTrinhKyLuatDetails['DonVi']} onChange={handleOnchangeDetails} name="DonVi" />
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình kỷ luật" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteQuaTrinhKyLuat}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình kỷ luật này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt quá trình kỷ luật" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt quá trình kỷ luật này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin quá trình kỷ luật" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  quá trình kỷ luật này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default QuaTrinhKyLuat;
