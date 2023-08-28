import { Button, Form, Checkbox, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'

import TableComponent from '../../../components/TableComponent/TableComponent'

import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'

import { getBase64, renderOptions } from '../../../utils'
import * as DanhMucXaService from '../../../services/DanhMucXaService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import ComboBoxComponent from '../../../components/ComboBoxComponent/ComboBoxComponent'

const Xa = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        DanhMucXaId: '',
        TenDanhMucXa: '',
        HienThi: false,
        GhiChu: '',
    })
    const [stateDanhMucXa, setStateDanhMucXa] = useState(inittial())
    const [stateDanhMucXaDetails, setStateDanhMucXaDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucXaId,
                TenDanhMucXa,
                HienThi,
                GhiChu } = data
            const res = DanhMucXaService.createDanhMucXa({
                DanhMucXaId,
                TenDanhMucXa,
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
            const res = DanhMucXaService.updateDanhMucXa(
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
            const res = DanhMucXaService.deleteDanhMucXa(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DanhMucXaService.deleteManyDanhMucXa(
                ids,
                token)
            return res
        },
    )

    const getAllDanhMucXas = async () => {
        const res = await DanhMucXaService.getAllDanhMucXa()
        return res
    }

    const fetchGetDetailsDanhMucXa = async (rowSelected) => {
        const res = await DanhMucXaService.getDetailsDanhMucXa(rowSelected)
        if (res?.data) {
            setStateDanhMucXaDetails({
                DanhMucXaId: res?.data?.DanhMucXaId,
                TenDanhMucXa: res?.data?.TenDanhMucXa,
                HienThi: res?.data?.HienThi,
                GhiChu: res?.data?.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDanhMucXaDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDanhMucXaDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDanhMucXa(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDanhMucXa = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyDanhMucXas = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucXa.refetch()
            }
        })
    }



    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucXa = useQuery({ queryKey: ['danhmucxas'], queryFn: getAllDanhMucXas })
    const { isLoading: isLoadingDanhMucXas, data: danhmucxas } = queryDanhMucXa
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucXa} />
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
            dataIndex: 'DanhMucXaId',
            ...getColumnSearchProps('DanhMucXaId')
        },
        {
            title: 'Tên',
            dataIndex: 'TenDanhMucXa',
            ...getColumnSearchProps('TenDanhMucXa')
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
    const dataTable = danhmucxas?.data?.length && danhmucxas?.data?.map((danhmucxa) => {
        return { ...danhmucxa, key: danhmucxa._id }
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
        setStateDanhMucXaDetails({
            DanhMucXaId: '',
            TenDanhMucXa: '',
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


    const handleDeleteDanhMucXa = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucXa.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDanhMucXa({
            DanhMucXaId: '',
            TenDanhMucXa: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            DanhMucXaId: stateDanhMucXa.DanhMucXaId,
            TenDanhMucXa: stateDanhMucXa.TenDanhMucXa,
            HienThi: stateDanhMucXa.HienThi,
            GhiChu: stateDanhMucXa.GhiChu
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryDanhMucXa.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateDanhMucXa({
            ...stateDanhMucXa,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucXa({
            ...stateDanhMucXa,
            HienThi: isChecked
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateDanhMucXaDetails({
            ...stateDanhMucXaDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucXa({
            ...stateDanhMucXa,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucXaDetails({
            ...stateDanhMucXaDetails,
            image: file.preview
        })
    }
    const onUpdateDanhMucXa = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDanhMucXaDetails }, {
            onSettled: () => {
                queryDanhMucXa.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateDanhMucXa({
            ...stateDanhMucXa,
            type: value
        })
    }
    const optionHuyen = [
        { value: 'o1', label: 'Bắc Từ Liêm' },
        { value: 'o2', label: 'Ba Đình' },
        { value: 'o3', label: 'Long Biên' },
    ];

    const handleChangeHuyen = (value) => {
        console.log(`selected value: ${value}`);
    };
    const optionTinh = [
        { value: 'a1', label: 'Hà Nội' },
        { value: 'a2', label: 'Hà Giang' },
        { value: 'a3', label: 'Hà Nam' },
    ];

    const handleChangeTinh = (value) => {
        console.log(`selected value: ${value}`);
    };

    return (
        <div>
            <WrapperHeader>Danh mục xã</WrapperHeader>
            {/* <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div> */}
            <div >
                Tỉnh
                &nbsp;
                <ComboBoxComponent options={optionTinh} onChange={handleChangeTinh} style={{ width: '250px' }} > </ComboBoxComponent>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;

                Huyện
                &nbsp;
                <ComboBoxComponent options={optionHuyen} onChange={handleChangeHuyen} style={{ width: '250px', pading: '0px 0px 0px 30px' }} > </ComboBoxComponent>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyDanhMucXas} columns={columns} isLoading={isLoadingDanhMucXas} data={dataTable} onRow={(record, rowIndex) => {
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
                        {/* DanhMucXaId,
                TenDanhMucXa,
                HienThi,
                GhiChu */}
                        <Form.Item
                            label="Mã Xã"
                            name="DanhMucXaId"
                            rules={[{ required: true, message: 'Hãy nhập mã cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucXa['DanhMucXaId']}
                                onChange={handleOnchange}
                                name="DanhMucXaId"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tên Xã"
                            name="TenDanhMucXa"
                            rules={[{ required: true, message: 'Hãy nhập tên cấp bậc!' }]}
                        >
                            <InputComponent
                                style={{ width: '100%' }}

                                value={stateDanhMucXa['TenDanhMucXa']}
                                onChange={handleOnchange}
                                name="TenDanhMucXa"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hiển Thị"
                            name="HienThi"
                            valuePropName="checked"
                            initialValue={stateDanhMucXa['HienThi']}
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

                                value={stateDanhMucXa['GhiChu']}
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
                        onFinish={onUpdateDanhMucXa}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDanhMucXaDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateDanhMucXaDetails['type']} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateDanhMucXaDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <InputComponent value={stateDanhMucXaDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <InputComponent value={stateDanhMucXaDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your count rating!' }]}
                        >
                            <InputComponent value={stateDanhMucXaDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of danhmucxa!' }]}
                        >
                            <InputComponent value={stateDanhMucXaDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateDanhMucXaDetails?.image && (
                                    <img src={stateDanhMucXaDetails?.image} style={{
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
            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucXa}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default Xa