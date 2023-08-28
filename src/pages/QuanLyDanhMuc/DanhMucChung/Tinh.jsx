import { Button, Form, Checkbox, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'

import TableComponent from '../../../components/TableComponent/TableComponent'

import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'

import { getBase64, renderOptions } from '../../../utils'
import * as DanhMucTinhService from '../../../services/DanhMucTinhService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'

const Tinh = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        DanhMucTinhId: '',
        TenDanhMucTinh: '',
        HienThi: false,
        GhiChu: '',
    })
    const [stateDanhMucTinh, setStateDanhMucTinh] = useState(inittial())
    const [stateDanhMucTinhDetails, setStateDanhMucTinhDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucTinhId,
                TenDanhMucTinh,
                HienThi,
                GhiChu } = data
            const res = DanhMucTinhService.createDanhMucTinh({
                DanhMucTinhId,
                TenDanhMucTinh,
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
            const res = DanhMucTinhService.updateDanhMucTinh(
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
            const res = DanhMucTinhService.deleteDanhMucTinh(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DanhMucTinhService.deleteManyDanhMucTinh(
                ids,
                token)
            return res
        },
    )

    const getAllDanhMucTinhs = async () => {
        const res = await DanhMucTinhService.getAllDanhMucTinh()
        return res
    }

    const fetchGetDetailsDanhMucTinh = async (rowSelected) => {
        const res = await DanhMucTinhService.getDetailsDanhMucTinh(rowSelected)
        if (res?.data) {
            setStateDanhMucTinhDetails({
                DanhMucTinhId: res?.data?.DanhMucTinhId,
                TenDanhMucTinh: res?.data?.TenDanhMucTinh,
                HienThi: res?.data?.HienThi,
                GhiChu: res?.data?.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDanhMucTinhDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDanhMucTinhDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDanhMucTinh(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDanhMucTinh = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyDanhMucTinhs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucTinh.refetch()
            }
        })
    }



    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucTinh = useQuery({ queryKey: ['danhmuctinhs'], queryFn: getAllDanhMucTinhs })
    const { isLoading: isLoadingDanhMucTinhs, data: danhmuctinhs } = queryDanhMucTinh
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucTinh} />
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
            dataIndex: 'DanhMucTinhId',
            ...getColumnSearchProps('DanhMucTinhId')
        },
        {
            title: 'Tên',
            dataIndex: 'TenDanhMucTinh',
            ...getColumnSearchProps('TenDanhMucTinh')
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
    const dataTable = danhmuctinhs?.data?.length && danhmuctinhs?.data?.map((danhmuctinh) => {
        return { ...danhmuctinh, key: danhmuctinh._id }
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
        setStateDanhMucTinhDetails({
            DanhMucTinhId: '',
            TenDanhMucTinh: '',
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


    const handleDeleteDanhMucTinh = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucTinh.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDanhMucTinh({
            DanhMucTinhId: '',
            TenDanhMucTinh: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            DanhMucTinhId: stateDanhMucTinh.DanhMucTinhId,
            TenDanhMucTinh: stateDanhMucTinh.TenDanhMucTinh,
            HienThi: stateDanhMucTinh.HienThi,
            GhiChu: stateDanhMucTinh.GhiChu
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryDanhMucTinh.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateDanhMucTinh({
            ...stateDanhMucTinh,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucTinh({
            ...stateDanhMucTinh,
            HienThi: isChecked
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateDanhMucTinhDetails({
            ...stateDanhMucTinhDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucTinh({
            ...stateDanhMucTinh,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucTinhDetails({
            ...stateDanhMucTinhDetails,
            image: file.preview
        })
    }
    const onUpdateDanhMucTinh = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDanhMucTinhDetails }, {
            onSettled: () => {
                queryDanhMucTinh.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateDanhMucTinh({
            ...stateDanhMucTinh,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Danh mục tỉnh</WrapperHeader>
            {/* <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div> */}
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyDanhMucTinhs} columns={columns} isLoading={isLoadingDanhMucTinhs} data={dataTable} onRow={(record, rowIndex) => {
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
                        {/* DanhMucTinhId,
                TenDanhMucTinh,
                HienThi,
                GhiChu */}
                        <Form.Item
                            label="Mã Tỉnh"
                            name="DanhMucTinhId"
                            rules={[{ required: true, message: 'Hãy nhập mã cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucTinh['DanhMucTinhId']}
                                onChange={handleOnchange}
                                name="DanhMucTinhId"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tên Tỉnh"
                            name="TenDanhMucTinh"
                            rules={[{ required: true, message: 'Hãy nhập tên cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucTinh['TenDanhMucTinh']}
                                onChange={handleOnchange}
                                name="TenDanhMucTinh"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hiển Thị"
                            name="HienThi"
                            valuePropName="checked"
                            initialValue={stateDanhMucTinh['HienThi']}
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

                                value={stateDanhMucTinh['GhiChu']}
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
                        onFinish={onUpdateDanhMucTinh}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDanhMucTinhDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateDanhMucTinhDetails['type']} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateDanhMucTinhDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <InputComponent value={stateDanhMucTinhDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <InputComponent value={stateDanhMucTinhDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your count rating!' }]}
                        >
                            <InputComponent value={stateDanhMucTinhDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of danhmuctinh!' }]}
                        >
                            <InputComponent value={stateDanhMucTinhDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateDanhMucTinhDetails?.image && (
                                    <img src={stateDanhMucTinhDetails?.image} style={{
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
            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucTinh}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default Tinh