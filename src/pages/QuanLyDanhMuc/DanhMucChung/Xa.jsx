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
        TenDanhMucHuyen: '',
        TenDanhMucTinh: '',
        HienThi: false,
        GhiChu: '',
    })
    //  const [stateDanhMucXa, setStateDanhMucXa] = useState(inittial())
    const [stateDanhMucXa, setStateDanhMucXa] = useState({
        TenDanhMucTinh: 'Hà Nội',
        TenDanhMucHuyen: 'Quận Ba Đình', // replace defaultValue with your desired default value
    });




    const [stateDanhMucXaDetails, setStateDanhMucXaDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucXaId,
                TenDanhMucXa,
                TenDanhMucHuyen,
                TenDanhMucTinh,
                HienThi,
                GhiChu } = data
            const res = DanhMucXaService.createDanhMucXa({
                DanhMucXaId,
                TenDanhMucXa,
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

    const fetchAllTypeTinh = async () => {
        const res = await DanhMucXaService.getAllTypeTinh()
        return res
    }
    const fetchAllTypeHuyen = async () => {
        const res = await DanhMucXaService.getAllTypeHuyen()
        return res
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucXa = useQuery({ queryKey: ['danhmucxas'], queryFn: getAllDanhMucXas })
    const queryDanhMucHuyen = useQuery({ queryKey: ['danhmuchuyen'], queryFn: fetchAllTypeHuyen })
    const queryDanhMucTinh = useQuery({ queryKey: ['danhmuctinh'], queryFn: fetchAllTypeTinh })


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
            title: 'Tên xã',
            dataIndex: 'TenDanhMucXa',
            ...getColumnSearchProps('TenDanhMucXa')
        },
        {
            title: 'Tên huyện',
            dataIndex: 'TenDanhMucHuyen',
            ...getColumnSearchProps('TenDanhMucHuyen')
        },
        {
            title: 'Tên tỉnh',
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
            TenDanhMucHuyen: '',
            TenDanhMucTinh: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };



    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucXa({
            ...stateDanhMucXa,
            HienThi: isChecked
        });
    };




    const dataTable = danhmucxas?.data?.length ? danhmucxas?.data?.map((danhmucxa) => {
        return { ...danhmucxa, key: danhmucxa._id };
    }) : [];


    const filteredDataTableXa = dataTable.filter((item) => {
        return item.TenDanhMucHuyen === stateDanhMucXa.TenDanhMucHuyen;
    });


    const handleChangeSelectHuyen = (child) => {
        setStateDanhMucXa({
            ...stateDanhMucXa,
            TenDanhMucHuyen: child,
        });
    };

    const handleChangeSelectTinh = (value) => {
        const selectedTinh = value;


        const filteredDataTable = dataTable.filter((item) => {
            return item.TenDanhMucTinh === selectedTinh;
        });

        const tenHuyenOptions = filteredDataTable.map((option) => option.TenDanhMucHuyen);


        setStateDanhMucXa({
            ...stateDanhMucXa,
            TenDanhMucTinh: value,
            // TenDanhMucHuyen: '',
            TenDanhMucHuyen: tenHuyenOptions[0],
            tenHuyenOptions: tenHuyenOptions,
        });
        console.log("Huyện:", tenHuyenOptions);



    };
    // Hàm lọc danh sách options không trùng nhau
    const filterOptions = (options) => {
        const uniqueOptions = [];
        const optionValues = new Set();

        if (options) { // Add a check for undefined or null options
            options.forEach((option) => {
                if (!optionValues.has(option)) {
                    uniqueOptions.push(option);
                    optionValues.add(option);
                }
            });
        }

        return uniqueOptions;
    };
    return (
        <div>
            <WrapperHeader>Danh mục xã</WrapperHeader>

            <div>
                Tỉnh&nbsp;
                <Select
                    name="TenDanhMucTinh"
                    style={{ width: 250 }}
                    value={stateDanhMucXa.TenDanhMucTinh}
                    // onChange={(value) => {
                    //     handleChangeSelectTinh(value); // Gọi hàm handleChangeSelectTinh khi giá trị thay đổi
                    // }}
                    onChange={handleChangeSelectTinh}
                    options={renderOptions(queryDanhMucTinh?.data?.data)}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                Huyện&nbsp;


                {/* <Select
                    name="TenDanhMucHuyen"
                    style={{ width: 250 }}
                    //  value={filteredHuyenOptions.length > 0 ? filteredHuyenOptions[0] : ''}
                    value={setStateDanhMucXa.TenDanhMucHuyen ? setStateDanhMucXa.TenDanhMucHuyen[0] : ''}
                    onChange={handleChangeSelectHuyen}
                    options={setStateDanhMucXa.tenHuyenOptions}
                //options={stateDanhMucXa.tenHuyenOptions ? stateDanhMucXa.tenHuyenOptions.map((option) => ({ label: option, value: option })) : []}
                /> */}
                <Select
                    name="TenDanhMucHuyen"
                    style={{ width: 250 }}
                    value={stateDanhMucXa.TenDanhMucHuyen}
                    onChange={handleChangeSelectHuyen}
                    options={filterOptions(stateDanhMucXa.tenHuyenOptions).map((option) => ({
                        label: option,
                        value: option,
                    }))}
                />


            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    columns={columns}
                    isLoading={isLoadingDanhMucXas}
                    data={filteredDataTableXa}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
            </div>

            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucXa}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default Xa