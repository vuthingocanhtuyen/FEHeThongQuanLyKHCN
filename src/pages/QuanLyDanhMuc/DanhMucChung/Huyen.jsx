import { Button, Form, Checkbox, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'

import TableComponent from '../../../components/TableComponent/TableComponent'

import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'

import { getBase64, renderOptions } from '../../../utils'
import * as DanhMucHuyenService from '../../../services/DanhMucHuyenService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import ComboBoxComponent from '../../../components/ComboBoxComponent/ComboBoxComponent'

const Huyen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        DanhMucHuyenId: '',
        TenDanhMucHuyen: '',
        TenDanhMucTinh: '',
        HienThi: false,
        GhiChu: '',
    })
    //   const [stateDanhMucHuyen, setStateDanhMucHuyen] = useState(inittial())
    const [stateDanhMucHuyen, setStateDanhMucHuyen] = useState({
        TenDanhMucTinh: 'Hà Nội', // replace defaultValue with your desired default value
    });


    const [stateDanhMucHuyenDetails, setStateDanhMucHuyenDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucHuyenId,
                TenDanhMucHuyen,
                TenDanhMucTinh,
                HienThi,
                GhiChu } = data
            const res = DanhMucHuyenService.createDanhMucHuyen({
                DanhMucHuyenId,
                TenDanhMucHuyen,
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
            const res = DanhMucHuyenService.updateDanhMucHuyen(
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
            const res = DanhMucHuyenService.deleteDanhMucHuyen(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DanhMucHuyenService.deleteManyDanhMucHuyen(
                ids,
                token)
            return res
        },
    )

    const getAllDanhMucHuyens = async () => {
        const res = await DanhMucHuyenService.getAllDanhMucHuyen()
        return res
    }

    const fetchGetDetailsDanhMucHuyen = async (rowSelected) => {
        const res = await DanhMucHuyenService.getDetailsDanhMucHuyen(rowSelected)
        if (res?.data) {
            setStateDanhMucHuyenDetails({
                DanhMucHuyenId: res?.data?.DanhMucHuyenId,
                TenDanhMucHuyen: res?.data?.TenDanhMucHuyen,
                TenDanhMucTinh: res?.data?.TenDanhMucTinh,
                HienThi: res?.data?.HienThi,
                GhiChu: res?.data?.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDanhMucHuyenDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDanhMucHuyenDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDanhMucHuyen(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDanhMucHuyen = () => {
        setIsOpenDrawer(true)
    }

    const fetchAllTypeTinh = async () => {
        const res = await DanhMucHuyenService.getAllTypeHuyenTinh()
        return res
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucHuyen = useQuery({ queryKey: ['danhmuchuyens'], queryFn: getAllDanhMucHuyens })
    const queryDanhMucTinh = useQuery({ queryKey: ['danhmuchuyen-tinh'], queryFn: fetchAllTypeTinh })
    const { isLoading: isLoadingDanhMucHuyens, data: danhmuchuyens } = queryDanhMucHuyen
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucHuyen} />
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
            dataIndex: 'DanhMucHuyenId',
            ...getColumnSearchProps('DanhMucHuyenId')
        },
        {
            title: 'Tên huyện',
            dataIndex: 'TenDanhMucHuyen',
            ...getColumnSearchProps('TenDanhMucHuyen')
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

    ];
    // const dataTable = danhmuchuyens?.data?.length && danhmuchuyens?.data?.map((danhmuchuyen) => {
    //     return { ...danhmuchuyen, key: danhmuchuyen._id }
    // })

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
        setStateDanhMucHuyenDetails({
            DanhMucHuyenId: '',
            TenDanhMucHuyen: '',
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


    const handleDeleteDanhMucHuyen = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucHuyen.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDanhMucHuyen({
            DanhMucHuyenId: '',
            TenDanhMucHuyen: '',
            TenDanhMucTinh: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucHuyen({
            ...stateDanhMucHuyen,
            HienThi: isChecked
        });
    };

    const handleChangeSelect = (value) => {
        setStateDanhMucHuyen({
            ...stateDanhMucHuyen,
            TenDanhMucTinh: value,

        });
    };

    // Make sure the dataTable variable is properly initialized to an empty array if it is null or undefined
    const dataTable = danhmuchuyens?.data?.length ? danhmuchuyens.data.map((danhmuchuyen) => {
        return { ...danhmuchuyen, key: danhmuchuyen._id };
    }) : [];

    const filteredDataTable = dataTable.filter((item) => {
        return item.TenDanhMucTinh === stateDanhMucHuyen.TenDanhMucTinh;
    });
    console.log("Tỉnh: ", filteredDataTable)
    return (
        <div>
            <WrapperHeader>Danh mục Huyện</WrapperHeader>
            <div>
                Tỉnh :
                &nbsp;
                <Select
                    name="TenDanhMucTinh"
                    style={{ width: 250 }}
                    value={stateDanhMucHuyen.TenDanhMucTinh}
                    onChange={handleChangeSelect}
                    options={renderOptions(queryDanhMucTinh?.data?.data)}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    columns={columns}
                    isLoading={isLoadingDanhMucHuyens}
                    data={filteredDataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
            </div>
            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucHuyen}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    );
}

export default Huyen