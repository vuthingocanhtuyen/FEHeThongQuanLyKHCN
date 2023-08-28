import { Button, Form, Checkbox, Space } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../../../components/TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { getBase64 } from '../../../utils'
import * as DanhMucCDCMKTService from '../../../services/DanhMucCDCMKTService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'

const CDCMKT = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        DanhMucCDCMKTId: '',
        TenDanhMucCDCMKT: '',
        HienThi: false,
        GhiChu: '',
    })
    const [stateDanhMucCDCMKT, setStateDanhMucCDCMKT] = useState(inittial())
    const [stateDanhMucCDCMKTDetails, setStateDanhMucCDCMKTDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucCDCMKTId,
                TenDanhMucCDCMKT,
                HienThi,
                GhiChu } = data
            const res = DanhMucCDCMKTService.createDanhMucCDCMKT({
                DanhMucCDCMKTId,
                TenDanhMucCDCMKT,
                HienThi,
                GhiChu
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = DanhMucCDCMKTService.updateDanhMucCDCMKT(
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
            const res = DanhMucCDCMKTService.deleteDanhMucCDCMKT(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DanhMucCDCMKTService.deleteManyDanhMucCDCMKT(
                ids,
                token)
            return res
        },
    )

    const getAllDanhMucCDCMKTs = async () => {
        const res = await DanhMucCDCMKTService.getAllDanhMucCDCMKT()
        return res
    }

    const fetchGetDetailsDanhMucCDCMKT = async (rowSelected) => {
        const res = await DanhMucCDCMKTService.getDetailsDanhMucCDCMKT(rowSelected)
        if (res?.data) {
            setStateDanhMucCDCMKTDetails({
                DanhMucCDCMKTId: res?.data?.DanhMucCDCMKTId,
                TenDanhMucCDCMKT: res?.data?.TenDanhMucCDCMKT,
                HienThi: res?.data?.HienThi,
                GhiChu: res?.data?.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDanhMucCDCMKTDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDanhMucCDCMKTDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDanhMucCDCMKT(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDanhMucCDCMKT = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyDanhMucCDCMKTs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucCDCMKT.refetch()
            }
        })
    }



    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucCDCMKT = useQuery({ queryKey: ['danhmuccapbacs'], queryFn: getAllDanhMucCDCMKTs })
    const { isLoading: isLoadingDanhMucCDCMKTs, data: danhmuccapbacs } = queryDanhMucCDCMKT
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucCDCMKT} />
            </div>
        )
    }


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
            title: 'Mã',
            dataIndex: 'DanhMucCDCMKTId',
            ...getColumnSearchProps('DanhMucCDCMKTId')
        },
        {
            title: 'Tên',
            dataIndex: 'TenDanhMucCDCMKT',
            ...getColumnSearchProps('TenDanhMucCDCMKT')
        },
        {
            title: 'Hiển thị',
            dataIndex: 'HienThi',
            render: (HienThi, record) => (
                <Checkbox
                    checked={HienThi}
                    onChange={(e) => handleCheckboxChange(record._id, e.target.checked)}
                />
            )
        },
        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     render: renderAction
        // },
    ];
    const dataTable = danhmuccapbacs?.data?.length && danhmuccapbacs?.data?.map((danhmuccapbac) => {
        return { ...danhmuccapbac, key: danhmuccapbac._id }
    })

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

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
        setStateDanhMucCDCMKTDetails({
            DanhMucCDCMKTId: '',
            TenDanhMucCDCMKT: '',
            HienThi: '',
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


    const handleDeleteDanhMucCDCMKT = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucCDCMKT.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDanhMucCDCMKT({
            DanhMucCDCMKTId: '',
            TenDanhMucCDCMKT: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            DanhMucCDCMKTId: stateDanhMucCDCMKT.DanhMucCDCMKTId,
            TenDanhMucCDCMKT: stateDanhMucCDCMKT.TenDanhMucCDCMKT,
            HienThi: stateDanhMucCDCMKT.HienThi,
            GhiChu: stateDanhMucCDCMKT.GhiChu
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryDanhMucCDCMKT.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateDanhMucCDCMKT({
            ...stateDanhMucCDCMKT,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucCDCMKT({
            ...stateDanhMucCDCMKT,
            HienThi: isChecked
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateDanhMucCDCMKTDetails({
            ...stateDanhMucCDCMKTDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucCDCMKT({
            ...stateDanhMucCDCMKT,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucCDCMKTDetails({
            ...stateDanhMucCDCMKTDetails,
            image: file.preview
        })
    }
    const onUpdateDanhMucCDCMKT = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDanhMucCDCMKTDetails }, {
            onSettled: () => {
                queryDanhMucCDCMKT.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateDanhMucCDCMKT({
            ...stateDanhMucCDCMKT,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Danh mục chức danh chuyên môn kỹ thuật</WrapperHeader>
            {/* <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div> */}
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyDanhMucCDCMKTs} columns={columns} isLoading={isLoadingDanhMucCDCMKTs} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <ModalComponent forceRender title="Thêm mới cấp bậc" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        {/* DanhMucCDCMKTId,
                TenDanhMucCDCMKT,
                HienThi,
                GhiChu */}
                        <Form.Item
                            label="Mã Chức danh chuyên môn kỹ thuật"
                            name="DanhMucCDCMKTId"
                            rules={[{ required: true, message: 'Hãy nhập mã cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucCDCMKT['DanhMucCDCMKTId']}
                                onChange={handleOnchange}
                                name="DanhMucCDCMKTId"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tên Chức danh chuyên môn kỹ thuật"
                            name="TenDanhMucCDCMKT"
                            rules={[{ required: true, message: 'Hãy nhập tên cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucCDCMKT['TenDanhMucCDCMKT']}
                                onChange={handleOnchange}
                                name="TenDanhMucCDCMKT"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hiển Thị"
                            name="HienThi"
                            valuePropName="checked"
                            initialValue={stateDanhMucCDCMKT['HienThi']}
                        >
                            <Checkbox onChange={handleCheckboxChange}>Hiển thị</Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Hãy nhập tên cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucCDCMKT['GhiChu']}
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


            {/* <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateDanhMucCDCMKT}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDanhMucCDCMKTDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateDanhMucCDCMKTDetails['type']} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateDanhMucCDCMKTDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <InputComponent value={stateDanhMucCDCMKTDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <InputComponent value={stateDanhMucCDCMKTDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your count rating!' }]}
                        >
                            <InputComponent value={stateDanhMucCDCMKTDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of danhmuccapbac!' }]}
                        >
                            <InputComponent value={stateDanhMucCDCMKTDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateDanhMucCDCMKTDetails?.image && (
                                    <img src={stateDanhMucCDCMKTDetails?.image} style={{
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
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent> */}
            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucCDCMKT}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default CDCMKT