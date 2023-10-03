
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64 } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as SauDaiHocService from '../../../services/SauDaiHocService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons'

import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
const SauDaiHoc = () => {

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
    const quyen = user.isAdmin;
    const inittial = () => ({
        LoaiBang: '',
        LinhVuc: '',
        TenLuanVan: '',
        Truong: '',
        QuocGia: '',
        NamNhan: '',
        TrangThai: '',
        GhiChu: '',
    })
    const [stateSauDaiHoc, setStateSauDaiHoc] = useState(inittial())
    const [stateSauDaiHocDetails, setStateSauDaiHocDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                code = 123,
                LoaiBang,
                LinhVuc,
                TenLuanVan,
                Truong, QuocGia, NamNhan,
                TrangThai = 0,
                GhiChu } = data
            const res = SauDaiHocService.createSauDaiHoc({
                QuanNhanId,
                code,
                LoaiBang,
                LinhVuc,
                TenLuanVan,
                Truong, QuocGia, NamNhan,
                TrangThai,
                GhiChu
            })
            console.log("data create saudaihoc:", res.data)
            return res

        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log("data update:", data)
            const { id,
                token,
                ...rests } = data
            const res = SauDaiHocService.updateSauDaiHoc(
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
            const res = SauDaiHocService.deleteSauDaiHoc(
                id,
                token)
            return res
        },
    )

    const mutationUpdateTrangThai = useMutationHooks(
        (data) => {
            console.log("data update:", data);
            const { id, token, ...rests } = data;
            const updatedData = { ...rests, TrangThai: 1 }; // Update the TrangThai attribute to 1
            const res = SauDaiHocService.updateSauDaiHoc(id, token, updatedData);
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
            const res = SauDaiHocService.updateSauDaiHoc(id, token, updatedData);
            return res;

        },

    )


    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = SauDaiHocService.deleteManySauDaiHoc(
                ids,
                token)
            return res
        },
    )


    const getAllSauDaiHocs = async () => {
        const res = await SauDaiHocService.getAllSauDaiHoc()
        return res
    }

    // show


    const fetchGetSauDaiHoc = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await SauDaiHocService.getSauDaiHocByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateSauDaiHocDetails({
                    LoaiBang: res?.data.LoaiBang,
                    LinhVuc: res?.data.LinhVuc,
                    QuocGia: res?.data.QuocGia,
                    TenLuanVan: res?.data.TenLuanVan,
                    Truong: res?.data.Truong,
                    NamNhan: res?.data.NamNhan,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateSauDaiHocDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateSauDaiHocDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateSauDaiHocDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsSauDaiHoc(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsSauDaiHoc = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManySauDaiHocs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                saudaihocDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const { data: dataUpdatedTT, isLoading: isLoadingUpdatedTT, isSuccess: isSuccessUpdatedTT, isError: isErrorUpdatedTT } = mutationUpdateTrangThai
    const { data: dataUpdatedNhapLai, isLoading: isLoadingUpdatedNhapLai, isSuccess: isSuccessUpdatedNhapLai, isError: isErrorUpdatedNhapLai } = mutationUpdateNhapLai


    const querySauDaiHoc = useQuery({ queryKey: ['saudaihocs'], queryFn: getAllSauDaiHocs })
    const saudaihocDetails = useQuery(['hosoquannhansaudaihoc', quannhanId], fetchGetSauDaiHoc, { enabled: !!quannhanId })
    console.log("dauhoc:", saudaihocDetails.data)
    const { isLoading: isLoadingSauDaiHoc, data: saudaihocs } = querySauDaiHoc
    const renderAction = () => {
        let additionalActions = null;
        if (quyen === "admin") {
            additionalActions = (
                <>
                    <CheckOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenPheDuyet(true)} />
                    <WarningOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenNhapLai(true)} />
                </>
            );
        }
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsSauDaiHoc} />
                {additionalActions}
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsSauDaiHoc = async (rowSelected) => {
        const res = await SauDaiHocService.getDetailsSauDaiHoc(rowSelected)
        if (res?.data) {
            setStateSauDaiHocDetails({
                LoaiBang: res?.data.LoaiBang,
                LinhVuc: res?.data.LinhVuc,
                TenLuanVan: res?.data.TenLuanVan,
                Truong: res?.data.Truong,
                QuocGia: res?.data.QuocGia,
                NamNhan: res?.data.NamNhan,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsSauDaiHoc(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateSauDaiHocDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateSauDaiHocDetails, isModalOpen])





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

    //const { data: saudaihocDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetSauDaiHoc, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", saudaihocDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },

        {
            title: 'Loại Bằng',
            dataIndex: 'LoaiBang',
            key: 'LoaiBang',
        },
        {
            title: 'Lĩnh Vực',
            dataIndex: 'LinhVuc',
            key: 'LinhVuc',
        },
        {
            title: 'Tên Luận Văn',
            dataIndex: 'TenLuanVan',
            key: 'TenLuanVan',
        },


        {
            title: 'Trường',
            dataIndex: 'Truong',
            key: 'Truong',
        },
        {
            title: ' Quốc gia',
            dataIndex: 'QuocGia',
            key: 'QuocGia',
        },
        {
            title: 'Năm nhận ',
            dataIndex: 'NamNhan',
            key: 'NamNhan',
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
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateSauDaiHocDetails({
            LoaiBang: '',
            LinhVuc: '',
            TenLuanVan: '',
            Truong: '',
            QuocGia: '',
            NamNhan: '',
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


    const handleDeleteSauDaiHoc = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                saudaihocDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateSauDaiHoc({
            LoaiBang: '',
            LinhVuc: '',
            TenLuanVan: '',
            Truong: '',
            QuocGia: '',
            NamNhan: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {
            LoaiBang: stateSauDaiHoc.LoaiBang,
            LinhVuc: stateSauDaiHoc.LinhVuc,
            TenLuanVan: stateSauDaiHoc.TenLuanVan,
            Truong: stateSauDaiHoc.Truong,
            QuocGia: stateSauDaiHoc.QuocGia,
            NamNhan: stateSauDaiHoc.NamNhan,
            //     TrangThai: stateSauDaiHoc.TrangThai,
            GhiChu: stateSauDaiHoc.GhiChu,
        }
        console.log("Finsh", stateSauDaiHoc)
        mutation.mutate(params, {
            onSettled: () => {
                saudaihocDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateSauDaiHoc({
            ...stateSauDaiHoc,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateSauDaiHocDetails({
            ...stateSauDaiHocDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateSauDaiHoc = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateSauDaiHocDetails }, {
            onSettled: () => {
                saudaihocDetails.refetch()
            }
        })
    }
    const onUpdateNgoaiNguTrangThai = () => {
        mutationUpdateTrangThai.mutate({ id: rowSelected, token: user?.access_token, ...stateSauDaiHocDetails }, {
            onSettled: () => {
                saudaihocDetails.refetch()
            }
        })
    }

    const onUpdateNgoaiNguNhapLai = () => {
        mutationUpdateNhapLai.mutate({ id: rowSelected, token: user?.access_token, ...stateSauDaiHocDetails }, {
            onSettled: () => {
                saudaihocDetails.refetch()
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

    const dataTable = saudaihocDetails?.data?.length && saudaihocDetails?.data?.map((saudaihocDetails) => {
        return {
            ...saudaihocDetails,
            key: saudaihocDetails._id,
            TrangThai: getTrangThaiText(saudaihocDetails.TrangThai)
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

    return (
        <div>
            <div>
                <WrapperHeader>Sau đại học</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={saudaihocDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingSauDaiHoc} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới Sau đại học" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Loại bằng"
                            name="LoaiBang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateSauDaiHoc['LoaiBang']}
                                onChange={handleOnchange}
                                name="LoaiBang"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Lĩnh vực"
                            name="LinhVuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateSauDaiHoc['LinhVuc']}
                                onChange={handleOnchange}
                                name="LinhVuc"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Tên luận văn"
                            name="TenLuanVan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateSauDaiHoc['TenLuanVan']}
                                onChange={handleOnchange}
                                name="TenLuanVan"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Trường"
                            name="Truong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateSauDaiHoc['Truong']}
                                onChange={handleOnchange}
                                name="Truong"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Quốc gia"
                            name="QuocGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateSauDaiHoc['QuocGia']}
                                onChange={handleOnchange}
                                name="QuocGia"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Năm nhận"
                            name="NamNhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateSauDaiHoc['NamNhan']}
                                onChange={handleOnchange}
                                name="NamNhan"
                            />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateSauDaiHoc['GhiChu']}
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


            <DrawerComponent title='Chi tiết Sau đại học' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateSauDaiHoc}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Loại bằng"
                            name="LoaiBang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateSauDaiHocDetails['LoaiBang']} onChange={handleOnchangeDetails} name="LoaiBang" />
                        </Form.Item>

                        <Form.Item
                            label="Lĩnh vực"
                            name="LinhVuc"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateSauDaiHocDetails['LinhVuc']} onChange={handleOnchangeDetails} name="LinhVuc" />
                        </Form.Item>

                        <Form.Item
                            label="Tên luận văn"
                            name="TenLuanVan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateSauDaiHocDetails['TenLuanVan']} onChange={handleOnchangeDetails} name="TenLuanVan" />
                        </Form.Item>

                        <Form.Item
                            label="Trường"
                            name="Truong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateSauDaiHocDetails['Truong']} onChange={handleOnchangeDetails} name="Truong" />
                        </Form.Item>

                        <Form.Item
                            label="Quốc gia"
                            name="QuocGia"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateSauDaiHocDetails['QuocGia']} onChange={handleOnchangeDetails} name="QuocGia" />
                        </Form.Item>

                        <Form.Item
                            label="Năm nhận"
                            name="NamNhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateSauDaiHocDetails['NamNhan']} onChange={handleOnchangeDetails} name="NamNhan" />
                        </Form.Item>



                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateSauDaiHocDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình Sau đại học" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteSauDaiHoc}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình Sau đại học này không?</div>
                </Loading>
            </ModalComponent>
            <ModalComponent title="Phê quyệt Sau đại học" open={isModalOpenPheDuyet} onCancel={handleCancelPheDuyet} onOk={onUpdateNgoaiNguTrangThai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc phê duyệt Sau đại học này không?</div>
                </Loading>
            </ModalComponent>

            <ModalComponent title="Yêu cầu nhập lại thông tin Sau đại học" open={isModalOpenNhapLai} onCancel={handleCancelNhapLai} onOk={onUpdateNgoaiNguNhapLai}>
                <Loading isLoading={isLoadingUpdatedTT}>
                    <div>Bạn có chắc yêu cầu nhập lại  Sau đại họcnày không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default SauDaiHoc;
