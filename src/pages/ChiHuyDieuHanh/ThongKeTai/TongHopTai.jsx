import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'


import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'

import { getBase64, renderOptions } from '../../../utils'
import * as ProductService from '../../../services/ProductService'

import { useMutationHooks } from '../../../hooks/useMutationHook'

import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import TableNoExecl from '../../../components/TableComponent/TableNoExecl'

const TongHopTai = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        discount: '',
    })
    const [stateProduct, setStateProduct] = useState(inittial())
    const [stateProductDetails, setStateProductDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { name,
                price,
                description,
                rating,
                image,
                type,
                countInStock, discount } = data
            const res = ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock,
                discount
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = ProductService.updateProduct(
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
            const res = ProductService.deleteProduct(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = ProductService.deleteManyProduct(
                ids,
                token)
            return res
        },
    )

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                discount: res?.data?.discount
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateProductDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        return res
    }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
    const { isLoading: isLoadingProducts, data: products } = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
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
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
    });


    const columns = [
        {
            title: 'Loại hình',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Thực tải',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Định mức chuẩn',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Đối tượng miễn giảm',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                }
            ],
        },
        {
            title: 'Yêu cầu tải',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone')
        },

    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
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
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
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


    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            discount: stateProduct.discount
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }

    return (
        <div>

            <div style={{ marginTop: '20px' }}>
                <TableNoExecl handleDelteMany={handleDelteManyProducts} columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>

        </div>
    )
}

export default TongHopTai