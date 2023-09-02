import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from '../style'

import TableComponent from '../../../components/TableComponent/TableComponent'

import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'

import { getBase64, renderOptions } from '../../../utils'
import * as DonViService from '../../../services/DonViService'

import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'

const TableDonVi = ({handleTreeNodeClick,treeNodeClickedId } ) => {
    console.log(treeNodeClickedId)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        code: '',
        codeview: '',
        name: '',
        note: '',
        edituser: '',
        edittime: '',
        lock: '',
        lockdate: '',
        managelevelcode: '',
        unitcode: '',
        parentcode: '',
        comparelevel: '',
        theorder: '',
        phone: '',
        email: '',
        managestaff: '',
        whois: '',
        thucluc:'',
        bienche: '',
    });
    
    
    const [stateDonVi, setStateDonVi] = useState(inittial())
    const [stateDonViDetails, setStateDonViDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { code,
                codeview,
                name,
                note,
                edituser,
                edittime,
                lock,
                lockdate,
                managelevelcode,
                unitcode,
                parentcode,
                comparelevel,
                theorder,
                phone,
                email,
                managestaff,
                whois,
                thucluc,
                bienche,} = data
            const res = DonViService.createDonVi({
                code,
                codeview,
                name,
                note,
                edituser,
                edittime,
                lock,
                lockdate,
                managelevelcode,
                unitcode,
                parentcode,
                comparelevel,
                theorder,
                phone,
                email,
                managestaff,
                whois,
                thucluc,
                bienche,
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = DonViService.updateDonVi(
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
            const res = DonViService.deleteDonVi(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DonViService.deleteManyDonVi(
                ids,
                token)
            return res
        },
    )

    const getAllDonVis = async () => {
        const res = await DonViService.getDonViConOnly2(treeNodeClickedId)
        return res
    }

    const fetchGetDetailsDonVi = async (rowSelected) => {
        const res = await DonViService.getDetailsDonVi(rowSelected)
        if (res?.data) {
            setStateDonViDetails({
                code: res?.data?.code,
                codeview: res?.data?.codeview,
                name: res?.data?.name,
                note: res?.data?.note,
                edituser: res?.data?.edituser,
                edittime: res?.data?.edittime,
                lock: res?.data?.lock,
                lockdate: res?.data?.lockdate,
                managelevelcode: res?.data?.managelevelcode,
                unitcode: res?.data?.unitcode,
                parentcode: res?.data?.parentcode,
                comparelevel: res?.data?.comparelevel,
                theorder: res?.data?.theorder,
                phone: res?.data?.phone,
                email: res?.data?.email,
                managestaff: res?.data?.managestaff,
                whois: res?.data?.whois,
                thucluc: res?.data?.thucluc,
                bienche: res?.data?.bienche,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDonViDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDonViDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDonVi(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDonVi = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyDonVis = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryDonVi.refetch()
            }
        })
    }

    

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDonVi = useQuery(
        ['prioritys', treeNodeClickedId], // Thay đổi queryKey để phản ánh treeNodeClickedId
        getAllDonVis,
        {
            enabled: !!treeNodeClickedId, // Kích hoạt truy vấn khi treeNodeClickedId không null
        }
    );
    // const typeDonVi = useQuery({ queryKey: ['type-priority'], queryFn: fetchAllTypeDonVi })
    const { isLoading: isLoadingDonVis, data: prioritys } = queryDonVi
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDonVi} />
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
            title: 'codeview',
            dataIndex: 'codeview',
            sorter: (a, b) => a.codeview.length - b.codeview.length,
            ...getColumnSearchProps('codeview')
        },
        {
            title: 'name',
            dataIndex: 'name',
            // sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            // sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'email',
            dataIndex: 'email',
            // sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
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
        setStateDonViDetails({
            code: '',
            codeview: '',
            name: '',
            note: '',
            edituser: '',
            edittime: '',
            lock: '',
            lockdate: '',
            managelevelcode: '',
            unitcode: '',
            parentcode: '',
            comparelevel: '',
            theorder: '',
            phone: '',
            email: '',
            managestaff:'',
            whois: '',
            thucluc: '',
            bienche: '',
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


    const handleDeleteDonVi = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDonVi.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDonVi({
            code: '',
            codeview: '',
            name: '',
            note: '',
            edituser: '',
            edittime: '',
            lock: '',
            lockdate: '',
            managelevelcode: '',
            unitcode: '',
            parentcode: '',
            comparelevel: '',
            theorder: '',
            phone: '',
            email: '',
            managestaff:'',
            whois: '',
            thucluc: '',
            bienche: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            code: stateDonVi.code,
            codeview: stateDonVi.codeview,
            name: stateDonVi.name,
            note: stateDonVi.note,
            edituser: stateDonVi.edituser,
            edittime: stateDonVi.edittime,
            lock: stateDonVi.lock,
            lockdate: stateDonVi.lockdate,
            managelevelcode: stateDonVi.managelevelcode,
            unitcode: stateDonVi.unitcode,
            parentcode: stateDonVi.parentcode,
            comparelevel: stateDonVi.comparelevel,
            theorder: stateDonVi.theorder,
            phone: stateDonVi.phone,
            email: stateDonVi.email,
            managestaff: stateDonVi.managestaff,
            whois: stateDonVi.whois,
            thucluc: stateDonVi.thucluc,
            bienche: stateDonVi.bienche,
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryDonVi.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateDonVi({
            ...stateDonVi,
            [e.target.code]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateDonViDetails({
            ...stateDonViDetails,
            [e.target.code]: e.target.value
        })
    }



    const onUpdateDonVi = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDonViDetails }, {
            onSettled: () => {
                queryDonVi.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateDonVi({
            ...stateDonVi,
            type: value
        })
    }

    return (
        
        <div>
            <WrapperHeader>Quản lý đơn vị</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                 <TableComponent handleDelteMany={handleDelteManyDonVis} columns={columns} isLoading={isLoadingDonVis} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id);
                            
                          }
                        
                    };
                }} />
            </div>
            <ModalComponent forceRender title="Thêm đơn vị" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            <InputComponent value={stateDonVi['code']} onChange={handleOnchange} name="code" />
                        </Form.Item>
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDonVi['name']} onChange={handleOnchange} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị cha"
                            name="parentcode"
                            rules={[{ required: true, message: 'Please input your parentcode!' }]}
                        >
                            <InputComponent value={stateDonVi['parentcode']} onChange={handleOnchange} name="parentcode" />
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
                        onFinish={onUpdateDonVi}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDonViDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDonViDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDonViDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa nhóm quyền" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDonVi}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa quyền này không?</div>
                </Loading>
            </ModalComponent>
        </div>
       
    )
}

export default TableDonVi