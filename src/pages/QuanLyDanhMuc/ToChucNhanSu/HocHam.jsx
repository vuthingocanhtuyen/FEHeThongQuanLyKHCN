import { Button, Form, Checkbox, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'

import TableComponent from '../../../components/TableComponent/TableComponent'

import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'

import { getBase64, renderOptions } from '../../../utils'
import * as DanhMucHocHamService from '../../../services/DanhMucHocHamService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'

const HocHam = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        DanhMucHocHamId: '',
        TenDanhMucHocHam: '',
        HienThi: false,
        GhiChu: '',
    })
    const [stateDanhMucHocHam, setStateDanhMucHocHam] = useState(inittial())
    const [stateDanhMucHocHamDetails, setStateDanhMucHocHamDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucHocHamId,
                TenDanhMucHocHam,
                HienThi,
                GhiChu } = data
            const res = DanhMucHocHamService.createDanhMucHocHam({
                DanhMucHocHamId,
                TenDanhMucHocHam,
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
            const res = DanhMucHocHamService.updateDanhMucHocHam(
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
            const res = DanhMucHocHamService.deleteDanhMucHocHam(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DanhMucHocHamService.deleteManyDanhMucHocHam(
                ids,
                token)
            return res
        },
    )

    const getAllDanhMucHocHams = async () => {
        const res = await DanhMucHocHamService.getAllDanhMucHocHam()
        return res
    }

    const fetchGetDetailsDanhMucHocHam = async (rowSelected) => {
        const res = await DanhMucHocHamService.getDetailsDanhMucHocHam(rowSelected)
        if (res?.data) {
            setStateDanhMucHocHamDetails({
                DanhMucHocHamId: res?.data?.DanhMucHocHamId,
                TenDanhMucHocHam: res?.data?.TenDanhMucHocHam,
                HienThi: res?.data?.HienThi,
                GhiChu: res?.data?.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDanhMucHocHamDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDanhMucHocHamDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDanhMucHocHam(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDanhMucHocHam = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyDanhMucHocHams = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucHocHam.refetch()
            }
        })
    }



    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucHocHam = useQuery({ queryKey: ['danhmuccapbacs'], queryFn: getAllDanhMucHocHams })
    const { isLoading: isLoadingDanhMucHocHams, data: danhmuccapbacs } = queryDanhMucHocHam
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucHocHam} />
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
            dataIndex: 'DanhMucHocHamId',
            ...getColumnSearchProps('DanhMucHocHamId')
        },
        {
            title: 'Tên',
            dataIndex: 'TenDanhMucHocHam',
            ...getColumnSearchProps('TenDanhMucHocHam')
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
        setStateDanhMucHocHamDetails({
            DanhMucHocHamId: '',
            TenDanhMucHocHam: '',
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


    const handleDeleteDanhMucHocHam = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucHocHam.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDanhMucHocHam({
            DanhMucHocHamId: '',
            TenDanhMucHocHam: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            DanhMucHocHamId: stateDanhMucHocHam.DanhMucHocHamId,
            TenDanhMucHocHam: stateDanhMucHocHam.TenDanhMucHocHam,
            HienThi: stateDanhMucHocHam.HienThi,
            GhiChu: stateDanhMucHocHam.GhiChu
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryDanhMucHocHam.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateDanhMucHocHam({
            ...stateDanhMucHocHam,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucHocHam({
            ...stateDanhMucHocHam,
            HienThi: isChecked
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateDanhMucHocHamDetails({
            ...stateDanhMucHocHamDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucHocHam({
            ...stateDanhMucHocHam,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucHocHamDetails({
            ...stateDanhMucHocHamDetails,
            image: file.preview
        })
    }
    const onUpdateDanhMucHocHam = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDanhMucHocHamDetails }, {
            onSettled: () => {
                queryDanhMucHocHam.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateDanhMucHocHam({
            ...stateDanhMucHocHam,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Danh mục học hàm</WrapperHeader>
            {/* <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div> */}
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyDanhMucHocHams} columns={columns} isLoading={isLoadingDanhMucHocHams} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <ModalComponent forceRender title="Thêm mới học hàm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        {/* DanhMucHocHamId,
                TenDanhMucHocHam,
                HienThi,
                GhiChu */}
                        <Form.Item
                            label="Mã Học Hàm"
                            name="DanhMucHocHamId"
                            rules={[{ required: true, message: 'Hãy nhập mã học hàm!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucHocHam['DanhMucHocHamId']}
                                onChange={handleOnchange}
                                name="DanhMucHocHamId"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tên Học Hàm"
                            name="TenDanhMucHocHam"
                            rules={[{ required: true, message: 'Hãy nhập tên học hàm!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucHocHam['TenDanhMucHocHam']}
                                onChange={handleOnchange}
                                name="TenDanhMucHocHam"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hiển Thị"
                            name="HienThi"
                            valuePropName="checked"
                            initialValue={stateDanhMucHocHam['HienThi']}
                        >
                            <Checkbox onChange={handleCheckboxChange}>Hiển thị</Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="GhiChu"
                        // rules={[{ required: true, message: 'Hãy nhập tên học hàm!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucHocHam['GhiChu']}
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
                        onFinish={onUpdateDanhMucHocHam}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDanhMucHocHamDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateDanhMucHocHamDetails['type']} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateDanhMucHocHamDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <InputComponent value={stateDanhMucHocHamDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <InputComponent value={stateDanhMucHocHamDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your count rating!' }]}
                        >
                            <InputComponent value={stateDanhMucHocHamDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of danhmuccapbac!' }]}
                        >
                            <InputComponent value={stateDanhMucHocHamDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateDanhMucHocHamDetails?.image && (
                                    <img src={stateDanhMucHocHamDetails?.image} style={{
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
            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucHocHam}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default HocHam