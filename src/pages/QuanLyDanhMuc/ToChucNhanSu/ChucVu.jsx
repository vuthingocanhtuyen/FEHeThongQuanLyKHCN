import { Button, Form, Checkbox, Space } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../../../components/TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { getBase64 } from '../../../utils'
import * as DanhMucChucVuService from '../../../services/DanhMucChucVuService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'

const ChucVu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        DanhMucChucVuId: '',
        TenDanhMucChucVu: '',
        HienThi: false,
        GhiChu: '',
    })
    const [stateDanhMucChucVu, setStateDanhMucChucVu] = useState(inittial())
    const [stateDanhMucChucVuDetails, setStateDanhMucChucVuDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucChucVuId,
                TenDanhMucChucVu,
                HienThi,
                GhiChu } = data
            const res = DanhMucChucVuService.createDanhMucChucVu({
                DanhMucChucVuId,
                TenDanhMucChucVu,
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
            const res = DanhMucChucVuService.updateDanhMucChucVu(
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
            const res = DanhMucChucVuService.deleteDanhMucChucVu(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DanhMucChucVuService.deleteManyDanhMucChucVu(
                ids,
                token)
            return res
        },
    )

    const getAllDanhMucChucVus = async () => {
        const res = await DanhMucChucVuService.getAllDanhMucChucVu()
        return res
    }

    const fetchGetDetailsDanhMucChucVu = async (rowSelected) => {
        const res = await DanhMucChucVuService.getDetailsDanhMucChucVu(rowSelected)
        if (res?.data) {
            setStateDanhMucChucVuDetails({
                DanhMucChucVuId: res?.data?.DanhMucChucVuId,
                TenDanhMucChucVu: res?.data?.TenDanhMucChucVu,
                HienThi: res?.data?.HienThi,
                GhiChu: res?.data?.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDanhMucChucVuDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDanhMucChucVuDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDanhMucChucVu(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDanhMucChucVu = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyDanhMucChucVus = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucChucVu.refetch()
            }
        })
    }



    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucChucVu = useQuery({ queryKey: ['danhmuccapbacs'], queryFn: getAllDanhMucChucVus })
    const { isLoading: isLoadingDanhMucChucVus, data: danhmuccapbacs } = queryDanhMucChucVu
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucChucVu} />
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
            dataIndex: 'DanhMucChucVuId',
            ...getColumnSearchProps('DanhMucChucVuId')
        },
        {
            title: 'Tên',
            dataIndex: 'TenDanhMucChucVu',
            ...getColumnSearchProps('TenDanhMucChucVu')
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
        setStateDanhMucChucVuDetails({
            DanhMucChucVuId: '',
            TenDanhMucChucVu: '',
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


    const handleDeleteDanhMucChucVu = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucChucVu.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDanhMucChucVu({
            DanhMucChucVuId: '',
            TenDanhMucChucVu: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            DanhMucChucVuId: stateDanhMucChucVu.DanhMucChucVuId,
            TenDanhMucChucVu: stateDanhMucChucVu.TenDanhMucChucVu,
            HienThi: stateDanhMucChucVu.HienThi,
            GhiChu: stateDanhMucChucVu.GhiChu
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryDanhMucChucVu.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateDanhMucChucVu({
            ...stateDanhMucChucVu,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucChucVu({
            ...stateDanhMucChucVu,
            HienThi: isChecked
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateDanhMucChucVuDetails({
            ...stateDanhMucChucVuDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucChucVu({
            ...stateDanhMucChucVu,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucChucVuDetails({
            ...stateDanhMucChucVuDetails,
            image: file.preview
        })
    }
    const onUpdateDanhMucChucVu = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDanhMucChucVuDetails }, {
            onSettled: () => {
                queryDanhMucChucVu.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateDanhMucChucVu({
            ...stateDanhMucChucVu,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Danh mục chức vụ</WrapperHeader>
            {/* <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div> */}
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyDanhMucChucVus} columns={columns} isLoading={isLoadingDanhMucChucVus} data={dataTable} onRow={(record, rowIndex) => {
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
                        {/* DanhMucChucVuId,
                TenDanhMucChucVu,
                HienThi,
                GhiChu */}
                        <Form.Item
                            label="Mã Cấp Bậc"
                            name="DanhMucChucVuId"
                            rules={[{ required: true, message: 'Hãy nhập mã cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucChucVu['DanhMucChucVuId']}
                                onChange={handleOnchange}
                                name="DanhMucChucVuId"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tên Cấp Bậc"
                            name="TenDanhMucChucVu"
                            rules={[{ required: true, message: 'Hãy nhập tên cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucChucVu['TenDanhMucChucVu']}
                                onChange={handleOnchange}
                                name="TenDanhMucChucVu"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hiển Thị"
                            name="HienThi"
                            valuePropName="checked"
                            initialValue={stateDanhMucChucVu['HienThi']}
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

                                value={stateDanhMucChucVu['GhiChu']}
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
                        onFinish={onUpdateDanhMucChucVu}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDanhMucChucVuDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateDanhMucChucVuDetails['type']} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateDanhMucChucVuDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <InputComponent value={stateDanhMucChucVuDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <InputComponent value={stateDanhMucChucVuDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your count rating!' }]}
                        >
                            <InputComponent value={stateDanhMucChucVuDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of danhmuccapbac!' }]}
                        >
                            <InputComponent value={stateDanhMucChucVuDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateDanhMucChucVuDetails?.image && (
                                    <img src={stateDanhMucChucVuDetails?.image} style={{
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
            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucChucVu}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default ChucVu