import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../../components/TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../components/InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as PriorityService from '../../services/PriorityService'
import * as PriorityByUserService from '../../services/PriorityByUserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
const ChucNangNhom = ({selectedRowId,handleselectedrow}) => {
    console.log(selectedRowId)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        code: '',
        description: '',
        showauth: '',
        name: '',
        lock: '',
        whois: '',
        groupcode: '',
        syscomponentcode: '',
        unitcode: '',
        addn: '',
        edit: '',
        dele: '',
    })
    
    
    const [statePriority, setStatePriority] = useState(inittial())
    const [statePriorityDetails, setStatePriorityDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { code,
                description,
                showauth,
                name,
                lock,
                whois,
                groupcode,
                syscomponentcode,
                unitcode,
                addn,
                edit,
                dele, } = data
            const res = PriorityService.createPriority({
                code,
                description,
                showauth,
                name,
                lock,
                whois,
                groupcode,
                syscomponentcode,
                unitcode,
                addn,
                edit,
                dele,
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = PriorityService.updatePriority(
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
            const res = PriorityService.deletePriority(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = PriorityService.deleteManyPriority(
                ids,
                token)
            return res
        },
    )

    const getAllPrioritys = async () => {
        const res = await PriorityByUserService.getPriorityByAdminGroup(selectedRowId)
        return res
    }

    const fetchGetDetailsPriority = async (rowSelected) => {
        const res = await PriorityService.getDetailsPriority(rowSelected)
        if (res?.data) {
            setStatePriorityDetails({
                code: res?.data?.code,
                description: res?.data?.description,
                showauth: res?.data?.showauth,
                name: res?.data?.name,
                lock: res?.data?.lock,
                whois: res?.data?.whois,
                groupcode: res?.data?.groupcode,
                syscomponentcode: res?.data?.syscomponentcode,
                unitcode: res?.data?.unitcode,
                addn: res?.data?.addn,
                edit: res?.data?.edit,
                dele: res?.data?.dele
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(statePriorityDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, statePriorityDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsPriority(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsPriority = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyPrioritys = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryPriority.refetch()
            }
        })
    }

    const fetchAllTypePriority = async () => {
        const res = await PriorityService.getAllType()
        return res
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryPriority = useQuery(
        ['prioritys', selectedRowId], // Thay đổi queryKey để phản ánh selectedRowId
        getAllPrioritys,
        {
            enabled: !!selectedRowId, // Kích hoạt truy vấn khi selectedRowId không null
        }
    );
    // const typePriority = useQuery({ queryKey: ['type-priority'], queryFn: fetchAllTypePriority })
    const { isLoading: isLoadingPrioritys, data: prioritys } = queryPriority
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsPriority} />
            </div>
        )
    }


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
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
            title: 'code',
            dataIndex: 'code',
            sorter: (a, b) => a.code.length - b.code.length,
            ...getColumnSearchProps('code')
        },
        {
            title: 'description',
            dataIndex: 'description',
            sorter: (a, b) => a.description.length - b.description.length,
            ...getColumnSearchProps('description')
        },
        {
            title: 'addn',
            dataIndex: 'addn',
            // sorter: (a, b) => a.addn.length - b.addn.length,
            ...getColumnSearchProps('addn')
        },
        {
            title: 'edit',
            dataIndex: 'edit',
            // sorter: (a, b) => a.edit.length - b.edit.length,
            ...getColumnSearchProps('edit')
        },
        {
            title: 'dele',
            dataIndex: 'dele',
            // sorter: (a, b) => a.dele.length - b.dele.length,
            ...getColumnSearchProps('dele')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = prioritys?.data?.length && prioritys?.data?.map((priority) => {
        return { ...priority, key: priority._id }
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
        setStatePriorityDetails({
            code: '',
            description: '',
            showauth: '',
            name: '',
            lock: '',
            whois: '',
            groupcode: '',
            syscomponentcode: '',
            unitcode: '',
            addn: '',
            edit: '',
            dele: '',
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


    const handleDeletePriority = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryPriority.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStatePriority({
            code: '',
            description: '',
            showauth: '',
            name: '',
            lock: '',
            whois: '',
            groupcode: '',
            syscomponentcode: '',
            unitcode: '',
            addn: '',
            edit: '',
            dele: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            code: statePriority.code,
            description: statePriority.description,
            showauth: statePriority.showauth,
            name: statePriority.name,
            lock: statePriority.lock,
            whois: statePriority.whois,
            groupcode: statePriority.groupcode,
            syscomponentcode: statePriority.syscomponentcode,
            unitcode: statePriority.unitcode,
            addn: statePriority.addn,
            edit: statePriority.edit,
            dele: statePriority.dele,
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryPriority.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStatePriority({
            ...statePriority,
            [e.target.code]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStatePriorityDetails({
            ...statePriorityDetails,
            [e.target.code]: e.target.value
        })
    }



    const onUpdatePriority = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...statePriorityDetails }, {
            onSettled: () => {
                queryPriority.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStatePriority({
            ...statePriority,
            type: value
        })
    }

    return (
        
        <div>
            <WrapperHeader>Quản lý nhóm người dùng</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                 <TableComponent handleDelteMany={handleDelteManyPrioritys} columns={columns} isLoading={isLoadingPrioritys} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id);
                            
                          }
                        
                    };
                }} />
            </div>
            <ModalComponent forceRender title="Thêm thông tin nhóm quản trị" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Mã"
                            name="code"
                            rules={[{ required: true, message: 'Please input your code!' }]}
                        >
                            <InputComponent value={statePriority['code']} onChange={handleOnchange} name="code" />
                        </Form.Item>
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={statePriority['name']} onChange={handleOnchange} name="name" />
                        </Form.Item>
                        
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>


            <DrawerComponent title='Danh sách nhóm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdatePriority}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={statePriorityDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={statePriorityDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={statePriorityDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa nhóm quyền" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeletePriority}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quyền này không?</div>
                </Loading>
            </ModalComponent>
        </div>
       
    )
}

export default ChucNangNhom