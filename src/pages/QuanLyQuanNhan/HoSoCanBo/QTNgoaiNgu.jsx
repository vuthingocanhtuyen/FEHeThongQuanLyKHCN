
import React, { useEffect, useState, useRef } from 'react';
import { Form, Table, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import * as message from '../../../components/Message/Message'
import { getBase64 } from '../../../utils'
import Loading from '../../../components/LoadingComponent/Loading'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import * as NgoaiNguService from '../../../services/NgoaiNguService';
import { WrapperHeader } from './style'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import TableComponent from '../../../components/TableComponent/TableComponent';
const NgoaiNgu = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const quannhanId = user.QuanNhanId;
    const inittial = () => ({
        NgonNgu: '',
        LoaiBang: '',
        NamNhan: '',
        CapDo: '',
        TuongDuong: '',
        HinhThucBang: '',
        TrangThai: '',
        GhiChu: '',
    })
    const [stateNgoaiNgu, setStateNgoaiNgu] = useState(inittial())
    const [stateNgoaiNguDetails, setStateNgoaiNguDetails] = useState(inittial())


    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { QuanNhanId = quannhanId,
                code = 123,
                NgonNgu,
                LoaiBang,
                NamNhan,
                CapDo,
                TuongDuong,
                HinhThucBang,
                TrangThai,
                GhiChu } = data
            const res = NgoaiNguService.createNgoaiNgu({
                QuanNhanId,
                code,
                NgonNgu,
                LoaiBang,
                NamNhan,
                CapDo,
                TuongDuong,
                HinhThucBang,
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
            const res = NgoaiNguService.updateNgoaiNgu(
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
            const res = NgoaiNguService.deleteNgoaiNgu(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = NgoaiNguService.deleteManyNgoaiNgu(
                ids,
                token)
            return res
        },
    )


    const getAllNgoaiNgus = async () => {
        const res = await NgoaiNguService.getAllNgoaiNgu()
        return res
    }

    // show


    const fetchGetNgoaiNgu = async (context) => {
        const quannhanId = context?.queryKey && context?.queryKey[1]
        console.log("idquannhancongtacfe:", quannhanId)
        if (quannhanId) {

            const res = await NgoaiNguService.getNgoaiNguByQuanNhanId(quannhanId)
            console.log("qtct res: ", res)
            if (res?.data) {
                setStateNgoaiNguDetails({
                    NgonNgu: res?.data.NgonNgu,
                    LoaiBang: res?.data.LoaiBang,
                    NamNhan: res?.data.NamNhan,
                    CapDo: res?.data.CapDo,
                    TuongDuong: res?.data.TuongDuong,
                    HinhThucBang: res?.data.HinhThucBang,
                    TrangThai: res?.data.TrangThai,
                    GhiChu: res?.data.GhiChu,
                })
            }
            // setIsLoadingUpdate(false)
            // console.log("qn:", res.data)
            // console.log("chi tiết qtct:", setStateNgoaiNguDetails)
            return res.data
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateNgoaiNguDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateNgoaiNguDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsNgoaiNgu(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsNgoaiNgu = () => {
        setIsOpenDrawer(true)
    }


    const handleDelteManyNgoaiNgus = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }


    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryNgoaiNgu = useQuery({ queryKey: ['ngoaingus'], queryFn: getAllNgoaiNgus })
    const qtcongtacDetails = useQuery(['hosoquannhanngoaingu', quannhanId], fetchGetNgoaiNgu, { enabled: !!quannhanId })

    const { isLoading: isLoadingNgoaiNgu, data: ngoaingus } = queryNgoaiNgu
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsNgoaiNgu} />
            </div>
        )
    }

    const onChange = () => { }

    const fetchGetDetailsNgoaiNgu = async (rowSelected) => {
        const res = await NgoaiNguService.getDetailsNgoaiNgu(rowSelected)
        if (res?.data) {
            setStateNgoaiNguDetails({
                NgonNgu: res?.data.NgonNgu,
                LoaiBang: res?.data.LoaiBang,
                NamNhan: res?.data.NamNhan,
                CapDo: res?.data.CapDo,
                TuongDuong: res?.data.TuongDuong,
                HinhThucBang: res?.data.HinhThucBang,
                TrangThai: res?.data.TrangThai,
                GhiChu: res?.data.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }



    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsNgoaiNgu(rowSelected)
        }
        setIsLoadingUpdate(false)
    }, [rowSelected])


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateNgoaiNguDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateNgoaiNguDetails, isModalOpen])





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

    //const { data: qtcongtacDetails } = useQuery(['hosoquannhan', quannhanId], fetchGetNgoaiNgu, { enabled: !!quannhanId })
    //console.log("qtrinhcongtac:", qtcongtacDetails)
    console.log("idquannhancongtac:", quannhanId)



    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,

        },

        {
            title: 'Ngôn ngữ',
            dataIndex: 'NgonNgu',
            key: 'NgonNgu',
        },
        {
            title: 'Loại bằng',
            dataIndex: 'LoaiBang',
            key: 'LoaiBang',
        },
        {
            title: 'Năm nhận',
            dataIndex: 'NamNhan',
            key: 'NamNhan',
        },
        {
            title: 'Cấp độ',
            dataIndex: 'CapDo',
            key: 'CapDo',
        },
        {
            title: 'Tương đương',
            dataIndex: 'TuongDuong',
            key: 'TuongDuong',
        },
        {
            title: 'Hình thức bằng',
            dataIndex: 'HinhThucBang',
            key: 'HinhThucBang',
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
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateNgoaiNguDetails({
            NgonNgu: '',
            LoaiBang: '',
            NamNhan: '',
            CapDo: '',
            TuongDuong: '',
            HinhThucBang: '',
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


    const handleDeleteNgoaiNgu = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateNgoaiNgu({
            NgonNgu: '',
            LoaiBang: '',
            NamNhan: '',
            CapDo: '',
            TuongDuong: '',
            HinhThucBang: '',
            TrangThai: '',
            GhiChu: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        const params = {

            NgonNgu: stateNgoaiNgu.NgonNgu,
            LoaiBang: stateNgoaiNgu.LoaiBang,
            NamNhan: stateNgoaiNgu.NamNhan,
            CapDo: stateNgoaiNgu.CapDo,
            TuongDuong: stateNgoaiNgu.TuongDuong,
            HinhThucBang: stateNgoaiNgu.HinhThucBang,
            TrangThai: stateNgoaiNgu.TrangThai,
            GhiChu: stateNgoaiNgu.GhiChu,
        }
        console.log("Finsh", stateNgoaiNgu)
        mutation.mutate(params, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }



    const handleOnchange = (e) => {
        console.log("e: ", e.target.name, e.target.value)
        setStateNgoaiNgu({
            ...stateNgoaiNgu,
            [e.target.name]: e.target.value
        })
    }


    const handleOnchangeDetails = (e) => {
        console.log('check', e.target.name, e.target.value)
        setStateNgoaiNguDetails({
            ...stateNgoaiNguDetails,
            [e.target.name]: e.target.value
        })
    }


    const onUpdateNgoaiNgu = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateNgoaiNguDetails }, {
            onSettled: () => {
                qtcongtacDetails.refetch()
            }
        })
    }

    const dataTable = qtcongtacDetails?.data?.length && qtcongtacDetails?.data?.map((qtcongtacDetails) => {
        return { ...qtcongtacDetails, key: qtcongtacDetails._id }
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
                <WrapperHeader>Ngôn ngữ</WrapperHeader>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
                </div>
                {isLoading ? ( // Hiển thị thông báo đang tải
                    <div>Loading...</div>
                ) : (
                    // <Table dataSource={qtcongtacDetails} columns={columns} />
                    <TableComponent columns={columns} isLoading={isLoadingNgoaiNgu} data={dataTable} onRow={(record, rowSelected) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id);


                            }

                        };
                    }} />
                )}

            </div>
            <ModalComponent forceRender title="Thêm mới ngôn ngữ" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            label="Ngôn ngữ"
                            name="NgonNgu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['NgonNgu']}
                                onChange={handleOnchange}
                                name="NgonNgu"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Loại bằng"
                            name="LoaiBang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['LoaiBang']}
                                onChange={handleOnchange}
                                name="LoaiBang"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Năm nhận"
                            name="NamNhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['NamNhan']}
                                onChange={handleOnchange}
                                name="NamNhan"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Cấp độ"
                            name="CapDo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['CapDo']}
                                onChange={handleOnchange}
                                name="CapDo"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tương Đương"
                            name="TuongDuong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['TuongDuong']}
                                onChange={handleOnchange}
                                name="TuongDuong"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Hình thức bằng"
                            name="HinhThucBang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['HinhThucBang']}
                                onChange={handleOnchange}
                                name="HinhThucBang"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['TrangThai']}
                                onChange={handleOnchange}
                                name="TrangThai"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateNgoaiNgu['GhiChu']}
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


            <DrawerComponent title='Chi tiết ngôn ngữ' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%">

                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateNgoaiNgu}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Ngôn ngữ"
                            name="NgonNgu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['NgonNgu']} onChange={handleOnchangeDetails} name="NgonNgu" />
                        </Form.Item>

                        <Form.Item
                            label="Loại bằng"
                            name="LoaiBang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['LoaiBang']} onChange={handleOnchangeDetails} name="LoaiBang" />
                        </Form.Item>

                        <Form.Item
                            label="Năm nhận"
                            name="NamNhan"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['NamNhan']} onChange={handleOnchangeDetails} name="NamNhan" />
                        </Form.Item>

                        <Form.Item
                            label="Cấp độ"
                            name="CapDo"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['CapDo']} onChange={handleOnchangeDetails} name="CapDo" />
                        </Form.Item>

                        <Form.Item
                            label="Tương đương"
                            name="TuongDuong"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['TuongDuong']} onChange={handleOnchangeDetails} name="TuongDuong" />
                        </Form.Item>

                        <Form.Item
                            label="Hình thức bằng"
                            name="HinhThucBang"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['HinhThucBang']} onChange={handleOnchangeDetails} name="HinhThucBang" />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái"
                            name="TrangThai"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['TrangThai']} onChange={handleOnchangeDetails} name="TrangThai" />
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                            rules={[{ required: true, message: 'Nhập vào chỗ trống!' }]}
                        >
                            <InputComponent value={stateNgoaiNguDetails['GhiChu']} onChange={handleOnchangeDetails} name="GhiChu" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent title="Xóa quá trình công tác" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteNgoaiNgu}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quá trình công tác này không?</div>
                </Loading>
            </ModalComponent>

        </div>

    );
};

export default NgoaiNgu;
