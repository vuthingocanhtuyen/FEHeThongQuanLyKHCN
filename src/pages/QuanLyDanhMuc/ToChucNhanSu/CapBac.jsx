// import { Button, Form, Select, Space } from 'antd'
// import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
// import React, { useRef } from 'react'
// import { WrapperHeader, WrapperUploadFile } from './style'

// import TableComponent from '../../../components/TableComponent/TableComponent'

// import { useState } from 'react'
// import InputComponent from '../../../components/InputComponent/InputComponent'

// import { getBase64, renderOptions } from '../../../utils'
// import * as DanhMucCapBacService from '../../../services/DanhMucCapBacService'

// import { useMutationHooks } from '../../../hooks/useMutationHook'
// import Loading from '../../../components/LoadingComponent/Loading'
// import { useEffect } from 'react'
// import * as message from '../../../components/Message/Message'
// import { useQuery } from '@tanstack/react-query'
// import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
// import { useSelector } from 'react-redux'
// import ModalComponent from '../../../components/ModalComponent/ModalComponent'

// const CapBac = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [rowSelected, setRowSelected] = useState('')
//     const [isOpenDrawer, setIsOpenDrawer] = useState(false)
//     const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
//     const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
//     const user = useSelector((state) => state?.user)
//     const searchInput = useRef(null);
//     const inittial = () => ({
//         name: '',
//         price: '',
//         description: '',
//         rating: '',
//         image: '',
//         type: '',
//         countInStock: '',
//         newType: '',
//         discount: '',
//     })
//     const [stateDanhMucCapBac, setStateDanhMucCapBac] = useState(inittial())
//     const [stateDanhMucCapBacDetails, setStateDanhMucCapBacDetails] = useState(inittial())

//     const [form] = Form.useForm();

//     const mutation = useMutationHooks(
//         (data) => {
//             const { name,
//                 price,
//                 description,
//                 rating,
//                 image,
//                 type,
//                 countInStock, discount } = data
//             const res = DanhMucCapBacService.createDanhMucCapBac({
//                 name,
//                 price,
//                 description,
//                 rating,
//                 image,
//                 type,
//                 countInStock,
//                 discount
//             })
//             return res
//         }
//     )
//     const mutationUpdate = useMutationHooks(
//         (data) => {
//             const { id,
//                 token,
//                 ...rests } = data
//             const res = DanhMucCapBacService.updateDanhMucCapBac(
//                 id,
//                 token,
//                 { ...rests })
//             return res
//         },
//     )

//     const mutationDeleted = useMutationHooks(
//         (data) => {
//             const { id,
//                 token,
//             } = data
//             const res = DanhMucCapBacService.deleteDanhMucCapBac(
//                 id,
//                 token)
//             return res
//         },
//     )

//     const mutationDeletedMany = useMutationHooks(
//         (data) => {
//             const { token, ...ids
//             } = data
//             const res = DanhMucCapBacService.deleteManyDanhMucCapBac(
//                 ids,
//                 token)
//             return res
//         },
//     )

//     const getAllDanhMucCapBacs = async () => {
//         const res = await DanhMucCapBacService.getAllDanhMucCapBac()
//         return res
//     }

//     const fetchGetDetailsDanhMucCapBac = async (rowSelected) => {
//         const res = await DanhMucCapBacService.getDetailsDanhMucCapBac(rowSelected)
//         if (res?.data) {
//             setStateDanhMucCapBacDetails({
//                 name: res?.data?.name,
//                 price: res?.data?.price,
//                 description: res?.data?.description,
//                 rating: res?.data?.rating,
//                 image: res?.data?.image,
//                 type: res?.data?.type,
//                 countInStock: res?.data?.countInStock,
//                 discount: res?.data?.discount
//             })
//         }
//         setIsLoadingUpdate(false)
//     }

//     useEffect(() => {
//         if (!isModalOpen) {
//             form.setFieldsValue(stateDanhMucCapBacDetails)
//         } else {
//             form.setFieldsValue(inittial())
//         }
//     }, [form, stateDanhMucCapBacDetails, isModalOpen])

//     useEffect(() => {
//         if (rowSelected && isOpenDrawer) {
//             setIsLoadingUpdate(true)
//             fetchGetDetailsDanhMucCapBac(rowSelected)
//         }
//     }, [rowSelected, isOpenDrawer])

//     const handleDetailsDanhMucCapBac = () => {
//         setIsOpenDrawer(true)
//     }

//     const handleDelteManyDanhMucCapBacs = (ids) => {
//         mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
//             onSettled: () => {
//                 queryDanhMucCapBac.refetch()
//             }
//         })
//     }

//     const fetchAllTypeDanhMucCapBac = async () => {
//         const res = await DanhMucCapBacService.getAllTypeDanhMucCapBac()
//         return res
//     }

//     const { data, isLoading, isSuccess, isError } = mutation
//     const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
//     const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
//     const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


//     const queryDanhMucCapBac = useQuery({ queryKey: ['danhmuccapbacs'], queryFn: getAllDanhMucCapBacs })
//     const typeDanhMucCapBac = useQuery({ queryKey: ['type-danhmuccapbac'], queryFn: fetchAllTypeDanhMucCapBac })
//     const { isLoading: isLoadingDanhMucCapBacs, data: danhmuccapbacs } = queryDanhMucCapBac
//     const renderAction = () => {
//         return (
//             <div>
//                 <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
//                 <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucCapBac} />
//             </div>
//         )
//     }


//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         // setSearchText(selectedKeys[0]);
//         // setSearchedColumn(dataIndex);
//     };
//     const handleReset = (clearFilters) => {
//         clearFilters();
//         // setSearchText('');
//     };

//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <InputComponent
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: 'block',
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? '#1890ff' : undefined,
//                 }}
//             />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         // render: (text) =>
//         //   searchedColumn === dataIndex ? (
//         //     // <Highlighter
//         //     //   highlightStyle={{
//         //     //     backgroundColor: '#ffc069',
//         //     //     padding: 0,
//         //     //   }}
//         //     //   searchWords={[searchText]}
//         //     //   autoEscape
//         //     //   textToHighlight={text ? text.toString() : ''}
//         //     // />
//         //   ) : (
//         //     text
//         //   ),
//     });


//     const columns = [
//         {
//             title: 'Mã',
//             dataIndex: 'name',
//             sorter: (a, b) => a.name.length - b.name.length,
//             ...getColumnSearchProps('name')
//         },
//         {
//             title: 'Tên',
//             dataIndex: 'price',
//             sorter: (a, b) => a.price - b.price,
//             filters: [
//                 {
//                     text: '>= 50',
//                     value: '>=',
//                 },
//                 {
//                     text: '<= 50',
//                     value: '<=',
//                 }
//             ],
//             onFilter: (value, record) => {
//                 if (value === '>=') {
//                     return record.price >= 50
//                 }
//                 return record.price <= 50
//             },
//         },
//         {
//             title: 'Thứ tự',
//             dataIndex: 'rating',
//             sorter: (a, b) => a.rating - b.rating,
//             filters: [
//                 {
//                     text: '>= 3',
//                     value: '>=',
//                 },
//                 {
//                     text: '<= 3',
//                     value: '<=',
//                 }
//             ],
//             onFilter: (value, record) => {
//                 if (value === '>=') {
//                     return Number(record.rating) >= 3
//                 }
//                 return Number(record.rating) <= 3
//             },
//         },
//         {
//             title: 'Ghi chú',
//             dataIndex: 'type',
//         },
//         {
//             title: 'Action',
//             dataIndex: 'action',
//             render: renderAction
//         },
//     ];
//     const dataTable = danhmuccapbacs?.data?.length && danhmuccapbacs?.data?.map((danhmuccapbac) => {
//         return { ...danhmuccapbac, key: danhmuccapbac._id }
//     })

//     useEffect(() => {
//         if (isSuccess && data?.status === 'OK') {
//             message.success()
//             handleCancel()
//         } else if (isError) {
//             message.error()
//         }
//     }, [isSuccess])

//     useEffect(() => {
//         if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
//             message.success()
//         } else if (isErrorDeletedMany) {
//             message.error()
//         }
//     }, [isSuccessDelectedMany])

//     useEffect(() => {
//         if (isSuccessDelected && dataDeleted?.status === 'OK') {
//             message.success()
//             handleCancelDelete()
//         } else if (isErrorDeleted) {
//             message.error()
//         }
//     }, [isSuccessDelected])

//     const handleCloseDrawer = () => {
//         setIsOpenDrawer(false);
//         setStateDanhMucCapBacDetails({
//             name: '',
//             price: '',
//             description: '',
//             rating: '',
//             image: '',
//             type: '',
//             countInStock: ''
//         })
//         form.resetFields()
//     };

//     useEffect(() => {
//         if (isSuccessUpdated && dataUpdated?.status === 'OK') {
//             message.success()
//             handleCloseDrawer()
//         } else if (isErrorUpdated) {
//             message.error()
//         }
//     }, [isSuccessUpdated])

//     const handleCancelDelete = () => {
//         setIsModalOpenDelete(false)
//     }


//     const handleDeleteDanhMucCapBac = () => {
//         mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
//             onSettled: () => {
//                 queryDanhMucCapBac.refetch()
//             }
//         })
//     }

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setStateDanhMucCapBac({
//             name: '',
//             price: '',
//             description: '',
//             rating: '',
//             image: '',
//             type: '',
//             countInStock: '',
//             discount: '',
//         })
//         form.resetFields()
//     };

//     const onFinish = () => {
//         const params = {
//             name: stateDanhMucCapBac.name,
//             price: stateDanhMucCapBac.price,
//             description: stateDanhMucCapBac.description,
//             rating: stateDanhMucCapBac.rating,
//             image: stateDanhMucCapBac.image,
//             type: stateDanhMucCapBac.type === 'add_type' ? stateDanhMucCapBac.newType : stateDanhMucCapBac.type,
//             countInStock: stateDanhMucCapBac.countInStock,
//             discount: stateDanhMucCapBac.discount
//         }
//         mutation.mutate(params, {
//             onSettled: () => {
//                 queryDanhMucCapBac.refetch()
//             }
//         })
//     }

//     const handleOnchange = (e) => {
//         setStateDanhMucCapBac({
//             ...stateDanhMucCapBac,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleOnchangeDetails = (e) => {
//         setStateDanhMucCapBacDetails({
//             ...stateDanhMucCapBacDetails,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleOnchangeAvatar = async ({ fileList }) => {
//         const file = fileList[0]
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj);
//         }
//         setStateDanhMucCapBac({
//             ...stateDanhMucCapBac,
//             image: file.preview
//         })
//     }

//     const handleOnchangeAvatarDetails = async ({ fileList }) => {
//         const file = fileList[0]
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj);
//         }
//         setStateDanhMucCapBacDetails({
//             ...stateDanhMucCapBacDetails,
//             image: file.preview
//         })
//     }
//     const onUpdateDanhMucCapBac = () => {
//         mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDanhMucCapBacDetails }, {
//             onSettled: () => {
//                 queryDanhMucCapBac.refetch()
//             }
//         })
//     }

//     const handleChangeSelect = (value) => {
//         setStateDanhMucCapBac({
//             ...stateDanhMucCapBac,
//             type: value
//         })
//     }

//     return (
//         <div>
//             <WrapperHeader>Quản lý cấp bậc</WrapperHeader>
//             <div style={{ marginTop: '10px' }}>
//                 <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
//             </div>
//             <div style={{ marginTop: '20px' }}>
//                 <TableComponent handleDelteMany={handleDelteManyDanhMucCapBacs} columns={columns} isLoading={isLoadingDanhMucCapBacs} data={dataTable} onRow={(record, rowIndex) => {
//                     return {
//                         onClick: event => {
//                             setRowSelected(record._id)
//                         }
//                     };
//                 }} />
//             </div>
//             <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
//                 <Loading isLoading={isLoading}>

//                     <Form
//                         name="basic"
//                         labelCol={{ span: 6 }}
//                         wrapperCol={{ span: 18 }}
//                         onFinish={onFinish}
//                         autoComplete="on"
//                         form={form}
//                     >
//                         <Form.Item
//                             label="Name"
//                             name="name"
//                             rules={[{ required: true, message: 'Please input your name!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBac['name']} onChange={handleOnchange} name="name" />
//                         </Form.Item>

//                         <Form.Item
//                             label="Type"
//                             name="type"
//                             rules={[{ required: true, message: 'Please input your type!' }]}
//                         >
//                             <Select
//                                 name="type"
//                                 // defaultValue="lucy"
//                                 // style={{ width: 120 }}
//                                 value={stateDanhMucCapBac.type}
//                                 onChange={handleChangeSelect}
//                                 options={renderOptions(typeDanhMucCapBac?.data?.data)}
//                             />
//                         </Form.Item>
//                         {stateDanhMucCapBac.type === 'add_type' && (
//                             <Form.Item
//                                 label='New type'
//                                 name="newType"
//                                 rules={[{ required: true, message: 'Please input your type!' }]}
//                             >
//                                 <InputComponent value={stateDanhMucCapBac.newType} onChange={handleOnchange} name="newType" />
//                             </Form.Item>
//                         )}
//                         <Form.Item
//                             label="Count inStock"
//                             name="countInStock"
//                             rules={[{ required: true, message: 'Please input your count inStock!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBac.countInStock} onChange={handleOnchange} name="countInStock" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Price"
//                             name="price"
//                             rules={[{ required: true, message: 'Please input your count price!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBac.price} onChange={handleOnchange} name="price" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Description"
//                             name="description"
//                             rules={[{ required: true, message: 'Please input your count description!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBac.description} onChange={handleOnchange} name="description" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Rating"
//                             name="rating"
//                             rules={[{ required: true, message: 'Please input your count rating!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBac.rating} onChange={handleOnchange} name="rating" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Discount"
//                             name="discount"
//                             rules={[{ required: true, message: 'Please input your discount of danhmuccapbac!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBac.discount} onChange={handleOnchange} name="discount" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Image"
//                             name="image"
//                             rules={[{ required: true, message: 'Please input your count image!' }]}
//                         >
//                             <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
//                                 <Button >Select File</Button>
//                                 {stateDanhMucCapBac?.image && (
//                                     <img src={stateDanhMucCapBac?.image} style={{
//                                         height: '60px',
//                                         width: '60px',
//                                         borderRadius: '50%',
//                                         objectFit: 'cover',
//                                         marginLeft: '10px'
//                                     }} alt="avatar" />
//                                 )}
//                             </WrapperUploadFile>
//                         </Form.Item>
//                         <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//                             <Button type="primary" htmlType="submit">
//                                 Submit
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </Loading>
//             </ModalComponent>


//             <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
//                 <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

//                     <Form
//                         name="basic"
//                         labelCol={{ span: 2 }}
//                         wrapperCol={{ span: 22 }}
//                         onFinish={onUpdateDanhMucCapBac}
//                         autoComplete="on"
//                         form={form}
//                     >
//                         <Form.Item
//                             label="Name"
//                             name="name"
//                             rules={[{ required: true, message: 'Please input your name!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBacDetails['name']} onChange={handleOnchangeDetails} name="name" />
//                         </Form.Item>

//                         <Form.Item
//                             label="Type"
//                             name="type"
//                             rules={[{ required: true, message: 'Please input your type!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBacDetails['type']} onChange={handleOnchangeDetails} name="type" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Count inStock"
//                             name="countInStock"
//                             rules={[{ required: true, message: 'Please input your count inStock!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBacDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Price"
//                             name="price"
//                             rules={[{ required: true, message: 'Please input your count price!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBacDetails.price} onChange={handleOnchangeDetails} name="price" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Description"
//                             name="description"
//                             rules={[{ required: true, message: 'Please input your count description!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBacDetails.description} onChange={handleOnchangeDetails} name="description" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Rating"
//                             name="rating"
//                             rules={[{ required: true, message: 'Please input your count rating!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBacDetails.rating} onChange={handleOnchangeDetails} name="rating" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Discount"
//                             name="discount"
//                             rules={[{ required: true, message: 'Please input your discount of danhmuccapbac!' }]}
//                         >
//                             <InputComponent value={stateDanhMucCapBacDetails.discount} onChange={handleOnchangeDetails} name="discount" />
//                         </Form.Item>
//                         <Form.Item
//                             label="Image"
//                             name="image"
//                             rules={[{ required: true, message: 'Please input your count image!' }]}
//                         >
//                             <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
//                                 <Button >Select File</Button>
//                                 {stateDanhMucCapBacDetails?.image && (
//                                     <img src={stateDanhMucCapBacDetails?.image} style={{
//                                         height: '60px',
//                                         width: '60px',
//                                         borderRadius: '50%',
//                                         objectFit: 'cover',
//                                         marginLeft: '10px'
//                                     }} alt="avatar" />
//                                 )}
//                             </WrapperUploadFile>
//                         </Form.Item>
//                         <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//                             <Button type="primary" htmlType="submit">
//                                 Apply
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </Loading>
//             </DrawerComponent>
//             <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucCapBac}>
//                 <Loading isLoading={isLoadingDeleted}>
//                     <div>Bạn có chắc xóa sản phẩm này không?</div>
//                 </Loading>
//             </ModalComponent>
//         </div>
//     )
// }

// export default CapBac
import { Button, Form,Checkbox, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'

import TableComponent from '../../../components/TableComponent/TableComponent'

import { useState } from 'react'
import InputComponent from '../../../components/InputComponent/InputComponent'

import { getBase64, renderOptions } from '../../../utils'
import * as DanhMucCapBacService from '../../../services/DanhMucCapBacService'

import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../../components/DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'

const CapBac = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        DanhMucCapBacId: '',
        TenDanhMucCapBac: '',
        HienThi: false,
        GhiChu: '',
    })
    const [stateDanhMucCapBac, setStateDanhMucCapBac] = useState(inittial())
    const [stateDanhMucCapBacDetails, setStateDanhMucCapBacDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { DanhMucCapBacId,
                TenDanhMucCapBac,
                HienThi,
                GhiChu } = data
            const res = DanhMucCapBacService.createDanhMucCapBac({
                DanhMucCapBacId,
                TenDanhMucCapBac,
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
            const res = DanhMucCapBacService.updateDanhMucCapBac(
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
            const res = DanhMucCapBacService.deleteDanhMucCapBac(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = DanhMucCapBacService.deleteManyDanhMucCapBac(
                ids,
                token)
            return res
        },
    )

    const getAllDanhMucCapBacs = async () => {
        const res = await DanhMucCapBacService.getAllDanhMucCapBac()
        return res
    }

    const fetchGetDetailsDanhMucCapBac = async (rowSelected) => {
        const res = await DanhMucCapBacService.getDetailsDanhMucCapBac(rowSelected)
        if (res?.data) {
            setStateDanhMucCapBacDetails({
                DanhMucCapBacId: res?.data?.DanhMucCapBacId,
                TenDanhMucCapBac: res?.data?.TenDanhMucCapBac,
                HienThi: res?.data?.HienThi,
                GhiChu: res?.data?.GhiChu,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDanhMucCapBacDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateDanhMucCapBacDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsDanhMucCapBac(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsDanhMucCapBac = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyDanhMucCapBacs = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucCapBac.refetch()
            }
        })
    }

    

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryDanhMucCapBac = useQuery({ queryKey: ['danhmuccapbacs'], queryFn: getAllDanhMucCapBacs })
    const { isLoading: isLoadingDanhMucCapBacs, data: danhmuccapbacs } = queryDanhMucCapBac
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsDanhMucCapBac} />
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
            title: 'Mã',
            dataIndex: 'DanhMucCapBacId',
            ...getColumnSearchProps('DanhMucCapBacId')
        },
        {
            title: 'Tên',
            dataIndex: 'TenDanhMucCapBac',
            ...getColumnSearchProps('TenDanhMucCapBac')
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
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
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
        setStateDanhMucCapBacDetails({
            DanhMucCapBacId: '',
            TenDanhMucCapBac: '',
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


    const handleDeleteDanhMucCapBac = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryDanhMucCapBac.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDanhMucCapBac({
            DanhMucCapBacId: '',
            TenDanhMucCapBac: '',
            HienThi: '',
            GhiChu: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
                DanhMucCapBacId: stateDanhMucCapBac.DanhMucCapBacId,
                TenDanhMucCapBac: stateDanhMucCapBac.TenDanhMucCapBac,
                HienThi: stateDanhMucCapBac.HienThi,
                GhiChu: stateDanhMucCapBac.GhiChu
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryDanhMucCapBac.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateDanhMucCapBac({
            ...stateDanhMucCapBac,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setStateDanhMucCapBac({
            ...stateDanhMucCapBac,
            HienThi: isChecked
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateDanhMucCapBacDetails({
            ...stateDanhMucCapBacDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucCapBac({
            ...stateDanhMucCapBac,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDanhMucCapBacDetails({
            ...stateDanhMucCapBacDetails,
            image: file.preview
        })
    }
    const onUpdateDanhMucCapBac = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDanhMucCapBacDetails }, {
            onSettled: () => {
                queryDanhMucCapBac.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateDanhMucCapBac({
            ...stateDanhMucCapBac,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý cấp bậc</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)}>Thêm tham số</Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyDanhMucCapBacs} columns={columns} isLoading={isLoadingDanhMucCapBacs} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }} />
            </div>
            <ModalComponent forceRender title="Thêm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isLoading}>

                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên Danh Mục Cấp Bậc"
                            name="TenDanhMucCapBac"
                            rules={[{ required: true, message: 'Please input the category name!' }]}
                        >
                        <InputComponent
                        style={{ width: '100%' }} 
                        
                        value={stateDanhMucCapBac['TenDanhMucCapBac']}
                        onChange={handleOnchange}
                        name="TenDanhMucCapBac"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hiển Thị"
                            name="HienThi"
                            valuePropName="checked"
                            initialValue={stateDanhMucCapBac['HienThi']}
                        >
                        <Checkbox onChange={handleCheckboxChange}>Hiển thị</Checkbox>
                        </Form.Item>

                        
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
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
                        onFinish={onUpdateDanhMucCapBac}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateDanhMucCapBacDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateDanhMucCapBacDetails['type']} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateDanhMucCapBacDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your count price!' }]}
                        >
                            <InputComponent value={stateDanhMucCapBacDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your count description!' }]}
                        >
                            <InputComponent value={stateDanhMucCapBacDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your count rating!' }]}
                        >
                            <InputComponent value={stateDanhMucCapBacDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of danhmuccapbac!' }]}
                        >
                            <InputComponent value={stateDanhMucCapBacDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button >Select File</Button>
                                {stateDanhMucCapBacDetails?.image && (
                                    <img src={stateDanhMucCapBacDetails?.image} style={{
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
            <ModalComponent title="Xóa Danh mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteDanhMucCapBac}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa danh mục này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default CapBac